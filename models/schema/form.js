const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
  {
    title: String,
    image: [String],
  },
  { timestamps: true }
);

module.exports = formSchema;
