const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  senderID: mongoose.Schema.Types.ObjectId,
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
