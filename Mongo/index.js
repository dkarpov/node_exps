const mongo = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";

// conect to db
const connect = async () => {
  try {
    const client = await mongo.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    //select a database
    const db = client.db("dogs");

    const collection = db.collection("dogs");

    const result = await collection.insertOne({ name: "Roger" });
    const results = await collection.insertMany(
      [{ name: "Togo" }, { name: "Slyde" }],
      function (err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
      }
    );
    console.log(results);

    // find in collection
    const items = await collection.find().toArray();
    console.log(items);
    // update
    const item = await collection.updateOne(
      { name: "Togo" },
      { $set: { name: "Togo2" } }
    );
    console.log(item);
    // delete
    const dItem = await collection.deleteOne({ name: "Togo2" });
    console.log(dItem);

    client.close();
  } catch (error) {
    console.error(error);
  }
};

connect();
