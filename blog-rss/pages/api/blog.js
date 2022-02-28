var Airtable = require("airtable");
// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => {
  if (!req.method === "POST") {
    res.status(405).end(); //Method Not Allowed
    return;
  }

  const { name, email, blogurl, feedurl, notes } = req.body;
  console.log("@@@ file blog.js line 10", req.body);

  var base = new Airtable({ apiKey: process.env.APIKEY }).base(
    "app3f44W7NNsOKfdo"
  );

  base("RSS").create(
    [{ fields: { name, email, blogurl, feedurl, notes } }],
    (err) => {
      if (err) {
        s;
        console.error(err);
        res.status(500).end();
        return;
      }
    }
  );

  res.json({
    success: true,
  });
};
