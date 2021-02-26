const mongoose = require("mongoose");

const wordGuideSchema = new mongoose.Schema({
  word: String,
});

module.exports = wordGuideSchema;
