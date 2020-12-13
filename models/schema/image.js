const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
});

module.exports = imgSchema;
