const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  code: String,
});

module.exports = otpSchema;
