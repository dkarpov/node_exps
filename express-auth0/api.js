import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";

const app = express();
const PORT = process.env.PORT || 8888;
const users = [
  { id: 1, username: "admin", password: "admin" },
  { id: 2, username: "guest", password: "guest" },
];
const jwtCheck = auth({
  audience: "egghead-express",
  issuerBaseURL: "https://dev-epzu8qrgvnn1fkdx.eu.auth0.com/",
  tokenSigningAlg: "RS256",
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/resource", function (req, res, next) {
  res.status(200).send("You are able to use public api now!");
});

app.get("/resource/secret", jwtCheck, function (req, res, next) {
  res.status(200).send("You should be logged to use private api!");
});

app.post("/login", function (req, res) {
  //   res.send(`You logged in as ${req.body.username}`);
  if (!req.body.password || !req.body.username) {
    res.status(400).send("Please provide a password and a username");
    return;
  }

  const user = users.find(
    ({ username, password }) =>
      username === req.body.username && password === req.body.password
  );

  if (!user) {
    res.status(401).send("User not found");
    return;
  }

  const jwtToken = jwt.sign(
    { sub: user.id, username: user.username },
    "supercryptokey",
    { expiresIn: "33 hours" }
  );

  res.status(200).send({ access_token: jwtToken });
});

app.get("/status", (req, res) => {
  const localTime = new Date().toLocaleTimeString();

  res.status(200).send(`Server time is ${localTime}.`);
});

app.get("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
