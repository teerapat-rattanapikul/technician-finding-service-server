const mongoose = require("mongoose");

const facebookLinkSchenma = new mongoose.Schema({
  facebookID: String,
  userID: mongoose.Schema.Types.ObjectId,
});

module.exports = facebookLinkSchenma;
