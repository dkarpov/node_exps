const express = require('express');
const schema = require('./schema');

const graphqlHTTP = require('express-graphql').graphqlHTTP;

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

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
