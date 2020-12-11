const mongoose = require("mongoose");

const technicianInfoSchema = new mongoose.Schema(
  {
    aptitude: String,
    onSite: Boolean,
    star: Number,
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
