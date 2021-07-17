const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
// cookie parser middleware
app.use(cookieParser());
// static assets If you have an index.html file in public/, that will be served if you now hit the root domain URL (http://localhost:3000)
app.use(express.static("public"));

app.get("/", (req, res, next) => res.send("Hello World!"));

const myMiddleware = (req, res, next) => {
  console.log(req);
  next();
};

app.get("/mymiddleware", myMiddleware, (req, res) => res.send("Hello World!"));

app.listen(3000, () => console.log("Server ready"));
