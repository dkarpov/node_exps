const express = require("express");
const mongo = require("mongodb").MongoClient;
const cors = require("cors");

const app = express();
app.use(express.json());

const url = "mongodb://localhost:27017";
const whitelist = ["http://example1.com", "http://example2.com", "*"];
/*const corsOptions = {
    origin: "https://yourdomain.com",
};*/
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

//allow OPTIONS on just one resource
// app.options("/the/resource/you/request", cors())

//allow OPTIONS on all resources
app.options("*", cors());

let db, trips, expenses;

mongo.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) {
      console.error(err);
      return;
    }
    db = client.db("tripcost");
    trips = db.collection("trips");
    expenses = db.collection("expenses");
  }
);

app.post("/trip", (req, res) => {
  const name = name;
  console.log("@@@ file server.js line 35", trips);

  trips.insertOne({ name }, (err, results) => {
    if (err) {
      console.log("@@@ file server.js line 39", err);
      res.status(500).json({ err });
      return;
    }

    console.log("@@@ file server.js line 44", results);
    res.status(200).json({ ok: true });
  });
});

app.get("/trips", cors(), (req, res) => {
  trips.find().toArray((err, items) => {
    if (err) {
      console.log("@@@ file server.js line 48", err);
      res.status(500).json({ err });
      return;
    }

    res.status(200).json({ trips: items });
  });
});

app.get("/expenses", (req, res) => {
  expenses.find({ trip: req.body.trip }).toArray((err, items) => {
    if (err) {
      console.error(err);
      res.status(500).json({ err: err });
      return;
    }
    res.status(200).json({ expenses: items });
  });
});

app.post("/expense", (req, res) => {
  const { trip, date, amount, category, description } = req.body;
  expenses.insertOne(
    {
      trip: trip,
      date: date,
      amount: amount,
      category: category,
      description: description,
    },
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ err: err });
        return;
      }
      res.status(200).json({ ok: true });
    }
  );
});

app.listen(3000, () => {
  console.log("@@@ file server.js line 11");
});
