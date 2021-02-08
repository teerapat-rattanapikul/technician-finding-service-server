const mongoose = require("mongoose");

const wordGuideSchema = new mongoose.Schema({
  _id: false,
  word: String,
});

module.exports = wordGuideSchema;
