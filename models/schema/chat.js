const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  userID: mongoose.Schema.Types.ObjectId,
  userName: String,
  technicianID: mongoose.Schema.Types.ObjectId,
  technicianName: String,
  readStatus: Boolean,
  recentMessage: {
    sender: mongoose.Schema.Types.ObjectId,
    message: String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  history: [
    {
      sender: mongoose.Schema.Types.ObjectId,
      message: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = chatSchema;
