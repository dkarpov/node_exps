const express = require("express");
const session = require("express-session");
const app = express();

// url encoded middleware
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "343ji43j4n3jn4jk3n", //add a random string here
  })
);

app.get("/", (req, res, next) => {
  console.log(req.session);
});

app.post("/submit-form", (req, res) => {
  const username = req.body.username;
  //...
  res.end();
});

app.listen(3000, () => console.log("Server start"));
