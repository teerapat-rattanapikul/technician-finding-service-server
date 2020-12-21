const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  phone: String,
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
  technicianInfoID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "technicianInformations",
      require: true,
    },
  ],
  role: String,
});

module.exports = userInfoSchema;
