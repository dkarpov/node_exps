const express = require("express");
const path = require("path");
const redis = require("redis");
const bcrypt = require("bcrypt");
const session = require("express-session");
const { promisify } = require("util");

const app = express();
const RedisStore = require("connect-redis")(session);
const client = redis.createClient();
const saltRounds = 10;

const ahget = promisify(client.hget).bind(client);
const asmembers = promisify(client.smembers).bind(client);
const ahkeys = promisify(client.hkeys).bind(client);
const aincr = promisify(client.incr).bind(client);
const alrange = promisify(client.lrange).bind(client);

app.use(
  session({
    store: new RedisStore({ client: client }),
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 36000000, //10 hours, in milliseconds
      httpOnly: false,
      secure: false,
    },
    secret: "bM80SARMxlq4fiWhulfNSeUFURWLTY8vyf",
  })
);
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (req, res) => {
  if (req.session.userid) {
    /* client.hget(
      `user:${req.session.userid}`,
      "username",
      (err, currentUserName) => {
        client.smembers(`following:${currentUserName}`, (err, following) => {
          client.hkeys("users", (err, users) => {
            res.render("dashboard", {
              users: users.filter(
                (user) =>
                  user !== currentUserName && following.indexOf(user) === -1
              ),
            });
          });
        });
      }
    ); */
    const currentUserName = await ahget(
      `user:${req.session.userid}`,
      "username"
    );
    const following = await asmembers(`following:${currentUserName}`);
    const users = await ahkeys("users");

    res.render("dashboard", {
      users: users.filter(
        (user) => user !== currentUserName && following.indexOf(user) === -1
      ),
    });
  } else {
    res.render("login");
  }
});

app.post("/", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.render("error", {
      message: "Please set both username and password",
    });
    return;
  }

  const saveSessionAndRenderDashboard = (userid) => {
    req.session.userid = userid;
    req.session.save();
    res.redirect("/");
    // client.hkeys("users", (err, users) => {
    //   res.render("dashboard", { users });
    // });
  };

  const handleSignup = (username, password) => {
    client.incr("userid", async (err, userid) => {
      client.hmset("users", username, userid);

      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);
      console.log("signup >>>", hash);

      client.hmset(`user:${userid}`, "hash", hash, "username", username);

      saveSessionAndRenderDashboard(userid);
    });
  };

  const handleLogin = (userid, password) => {
    client.hget(`user:${userid}`, "hash", async (err, hash) => {
      console.log("@@@", password, userid, hash, err);
      const result = await bcrypt.compare(password, hash);
      if (result) {
        saveSessionAndRenderDashboard(userid);
      } else {
        res.render("error", {
          message: "Incorrect password",
        });
        return;
      }
    });
  };

  client.hget("users", username, (err, userid) => {
    if (!userid) {
      //signup procedure
      handleSignup(username, password);
    } else {
      //login procedure
      handleLogin(userid, password);
    }
  });

  console.log(req.body, username, password);
});

// post message
app.get("/post", (req, res) => {
  if (req.session.userid) {
    res.render("post");
  } else {
    res.render("login");
  }
});

app.post("/post", async (req, res) => {
  if (!req.session.userid) {
    res.render("login");
    return;
  }

  const { message } = req.body;
  const currentUserName = await ahget(`user:${req.session.userid}`, "username");
  const postid = await aincr("postid");
  client.hmset(
    `post:${postid}`,
    "userid",
    req.session.userid,
    "username",
    currentUserName,
    "message",
    message,
    "timestamp",
    Date.now()
  );
  client.lpush(`timeline:${currentUserName}`, postid);

  const followers = await asmembers(`followers:${currentUserName}`);
  for (follower of followers) {
    client.lpush(`timeline:${follower}`, postid);
  }

  res.redirect("/");
});

app.post("/follow", (req, res) => {
  if (!req.session.userid) {
    res.render("login");
    return;
  }

  const { username } = req.body;

  client.hget(
    `user:${req.session.userid}`,
    "username",
    (err, currentUserName) => {
      client.sadd(`following:${currentUserName}`, username);
      client.sadd(`following:${username}`, currentUserName);
    }
  );

  res.redirect("/");
});

app.listen(3000, () => console.log("Server is ready"));
