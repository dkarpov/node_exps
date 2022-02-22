import posts from "../../posts.json";

export default function handler(req, res) {
  res.status(200).json(posts);
}

// To separate POST from GET and other HTTP methods (PUT, DELETE), lookup the req.method value:
// In addition to req.query and req.method we already saw,
// we have access to cookies by referencing req.cookies, the request body in req.body.

// export default (req, res) => {
//   switch (req.method) {
//     case "GET":
//       //...
//       break
//     case "POST":
//       //...
//       break
//     default:
//       res.status(405).end() //Method Not Allowed
//       break
//   }
// }
