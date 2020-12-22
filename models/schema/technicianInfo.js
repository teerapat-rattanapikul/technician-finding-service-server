const mongoose = require("mongoose");

const technicianInfoSchema = new mongoose.Schema(
  {
    aptitude: { type: String, unique: true },
    onSite: Boolean,
    star: Number,
    address: {
      lat: Number,
      lon: Number,
    },
    description: String,
    // comment: [
    //   {
    //     detailComment: String,
    //   },
    // ],
    amountOfvoteStar: Number,
    amountOfcomment: Number,
    userInfoID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userInformations",
      require: true,
    },
  }
  // { timestamps: true }
);

module.exports = technicianInfoSchema;
