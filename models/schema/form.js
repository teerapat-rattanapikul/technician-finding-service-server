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
      _id: false,
      tech: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "technicianInformations",
        require: true,
      },
      location: {
        lat: Number,
        lon: Number,
      },
      minPrice: Number,
      maxPrice: Number,
    },
  ],
});

module.exports = formSchema;
