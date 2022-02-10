const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contributorSchema = new Schema({
  name: String,
  url: String,
  major: String,
  contributorId: String,
});

module.exports = mongoose.model("Contributor", contributorSchema);
