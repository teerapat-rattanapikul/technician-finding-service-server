const mongoose = require("mongoose");

const technicianInfoSchema = new mongoose.Schema({
  aptitude: [
    {
      aptitude: String,
      star: Number,
      amountOfvoteStar: Number,
      amountOfcomment: Number,
    },
  ],
  onSite: Boolean,
  address: {
    lat: Number,
    lon: Number,
  },
  description: String,
  count: Number,
  star: Number,
  amount: Number,
  comment: [
    {
      userID: mongoose.Schema.Types.ObjectId,
      comment: String,
    },
  ],
  userInfoID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userInformations",
    require: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
});
technicianInfoSchema.index({
  "aptitude.aptitude": "text",
  description: "text",
});
module.exports = technicianInfoSchema;
