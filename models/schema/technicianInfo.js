const mongoose = require("mongoose");

const technicianInfoSchema = new mongoose.Schema(
  {
    aptitude: String,
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
technicianInfoSchema.index({ aptitude: "text", description: "text" });
module.exports = technicianInfoSchema;
