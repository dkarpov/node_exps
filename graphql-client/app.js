import express from "express";
import fetch from "node-fetch";

const app = express();
// Serving static files in Express
// https://expressjs.com/en/starter/static-files.html
// To serve static files such as images, CSS files, and JavaScript files, use the express.static -
// built-in middleware function in Express.
app.use(express.static("public"));

// const query = `{ viewer { login } }`;
const query = `{
    search(query: "stars:>50000", type: REPOSITORY, first: 10) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            name
            owner {
              login
            }
            stargazers {
              totalCount
            }
          }
        }
      }
    }
  }
`;
const url = "https://api.github.com/graphql";

const options = {
  method: "post",
  headers: {
    "content-type": "application/json",
    authorization: "bearer " + process.env.APIKEY,
  },
  body: JSON.stringify({ query }),
};
app.get("/data", async (req, res) => {
  let response;
  try {
    response = await fetch(url, options);
  } catch (error) {
    console.error(error);
  }
  const data = await response.json();
  console.log(data);

  res.json(data);
});
app.listen(3000, () => console.log("Server ready"));
