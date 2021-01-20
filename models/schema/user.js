const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  userInfoID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userInformations",
    require: true,
  },
  technicianInfoID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "technicianInformations",
    require: true,
  },
});

module.exports = userSchema;
