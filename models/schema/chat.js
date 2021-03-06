const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  userID: mongoose.Schema.Types.ObjectId,
  userName: String,
  userAvatar: String,
  technicianID: mongoose.Schema.Types.ObjectId,
  technicianName: String,
  technicianAvatar: String,
  readStatus: Boolean,
  recentMessage: {
    _id: false,
    sender: mongoose.Schema.Types.ObjectId,
    message: String,
    msgType: String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  history: [
    {
      _id: false,
      sender: mongoose.Schema.Types.ObjectId,
      message: String,
      msgType: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = chatSchema;
