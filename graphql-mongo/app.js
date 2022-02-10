require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const schema = require("./schema");

const graphqlHTTP = require("express-graphql").graphqlHTTP;

const app = express();
// create .env file with localhost setup as below:
// MONGODB_URL="mongodb://localhost:27017"

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "graphql-mongoose",
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("App listen on port 3000");
});

// in browser open http://localhost:3000/graphql
// put query

// {
//     post(id:1) {
//         description
//     }
// }

// further read :
// https://www.digitalocean.com/community/tutorials/a-practical-graphql-getting-started-guide-with-nodejs
// https://www.section.io/engineering-education/build-a-graphql-server-using-nodejs/
