const express = require("express");
const app = express();

app.set("view engine", "pug");

app.get("/about", (req, res) => {
  res.render("about", { name: "Dima" });
});

app.get("/about2", (req, res) => {
  res.render("about2", { getName: () => "Flavio" });
});

app.get("/start", (req, res) => {
  res.render("start");
});

app.listen(3000, () => console.log("Server start"));
