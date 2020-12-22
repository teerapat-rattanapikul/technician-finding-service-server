const schema = require("./schema");
const mongoose = require("mongoose");
const tech = (module.exports = {
  //   chatroom: mongoose.model("chatID", schema.chatSchema),
  users: mongoose.model("users", schema.userSchema),
  userInfomations: mongoose.model("userInformations", schema.userInfoSchema),
  technicianInformations: mongoose.model(
    "technicianInformations",
    schema.technicianSchema
  ),
  forms: mongoose.model("forms", schema.formSchema),
  images: mongoose.model("imgs", schema.imageSchema),
  //   chats: mongoose.model("chats", schema.chatSchema),
});
