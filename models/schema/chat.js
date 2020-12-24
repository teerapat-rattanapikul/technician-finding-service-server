const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  technician: mongoose.Schema.Types.ObjectId,
  history: [
    {
      sender: mongoose.Schema.Types.ObjectId,
      massage: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = chatSchema;
