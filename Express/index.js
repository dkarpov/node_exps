const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log(req.query);
});
//json
app.get("/json", (req, res) => res.json({ gretings: "Hello World!" }));
//cookies
app.get("/cookie", (req, res) =>
  res
    .cookie("username", "Dima", {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
    })
    .send()
);
//headers
app.get("/headers", (req, res) => {
  console.log(req.headers);
  res.set("Content-Type", "text/html").send();
});
//redirections
app.get("/go-there", (req, res) => res.send("You have redirected here :)"));
app.get("/gohere", (req, res) => res.redirect("/go-there"));
//params
app.get("/uppercase/:theValue", (req, res) =>
  res.send(req.params.theValue.toUpperCase())
);

app.listen(3000, () => console.log("Server start"));
