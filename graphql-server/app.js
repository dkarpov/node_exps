const express = require("express");
const schema = require("./schema");
const log = require("loglevel");
const Sentry = require("@sentry/node");
// or use es6 import statements
// import * as Sentry from '@sentry/node';

const Tracing = require("@sentry/tracing");
// or use es6 import statements
// import * as Tracing from '@sentry/tracing';

const graphqlHTTP = require("express-graphql").graphqlHTTP;

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.get(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("App listen on port 3000");
  log.warn("module-tastic");
});

/////////////// Sentry logging experiments ////////////////
Sentry.init({
  dsn: "https://be18d756a74d4c22b5408826734a2320@o1164413.ingest.sentry.io/6253515",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
  op: "test",
  name: "My First Test Transaction",
});

setTimeout(() => {
  try {
    foo();
  } catch (e) {
    Sentry.captureException(e);
  } finally {
    transaction.finish();
  }
}, 99);

// to have logs locally wirtten, put below code in conosole
// $ nodemon app.js > message.log 2> error.log

// Sign up for a free account on https://sentry.io and follow instructions
// I just copy pasted initial setup code for Sentry

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
