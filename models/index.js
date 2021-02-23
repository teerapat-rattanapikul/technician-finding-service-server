const schema = require("./schema");
const mongoose = require("mongoose");
module.exports = {
  users: mongoose.model("users", schema.userSchema),
  userInfomations: mongoose.model("userInformations", schema.userInfoSchema),
  technicianInformations: mongoose.model(
    "technicianInformations",
    schema.technicianInfoSchema
  ),
  forms: mongoose.model("forms", schema.formSchema),
  chats: mongoose.model("chats", schema.chatSchema),
  words: mongoose.model("words", schema.wordGuideSchema),
  fbLink: mongoose.model("facebookLink", schema.facebookLinkSchema),
};
