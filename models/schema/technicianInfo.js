const mongoose = require("mongoose");
const technicianInfoSchema = new mongoose.Schema({
  aptitude: [
    {
      _id: false,
      aptitude: String,
      star: Number,
      amountOfvoteStar: Number,
      amountOfcomment: Number,
      voteID: [String],
    },
  ],
  workDay: [Number],
  workTime: {
    start: {
      hour: Number,
      minutes: Number,
    },
    end: {
      hour: Number,
      minutes: Number,
    },
  },
  acceptForm: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "forms",
      require: true,
    },
  ],
  newForm: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "forms",
      require: true,
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
      _id: false,
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
