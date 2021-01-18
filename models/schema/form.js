const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  senderID: String,
  detail: String,
  image: [String],
  date: String,
  techType: String,
  location: {
    lat: Number,
    lon: Number,
  },
});

module.exports = formSchema;
