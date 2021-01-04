const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  senderID: String,
  detail: String,
  image: [String],
  date: String,
});

module.exports = formSchema;
