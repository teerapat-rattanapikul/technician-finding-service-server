const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  senderID: mongoose.Schema.Types.ObjectId,
  userInfoID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userInformations",
    require: true,
  },
  detail: String,
  image: [String],
  date: String,
  techType: String,
  location: {
    lat: Number,
    lon: Number,
  },
  technician: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "technicianInformations",
      require: true,
    },
  ],
});

module.exports = formSchema;
