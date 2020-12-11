const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
});

module.exports = imgSchema;
