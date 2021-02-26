const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  phone: String,
  avatar: String,
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
  technicianInfoID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "technicianInformations",
    require: true,
  },
  forms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "forms",
      require: true,
    },
  ],
  acceptForms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "forms",
      require: true,
    },
  ],
  role: String,
  chatHistry: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chats",
      require: true,
    },
  ],
});
userInfoSchema.index({
  firstname: "text",
  lastname: "text",
});
module.exports = userInfoSchema;
