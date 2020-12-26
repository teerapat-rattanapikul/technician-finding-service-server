const chatModel = require("../models").chats;
const userInfoModel = require("../models").userInfomations;
module.exports = {
  createChatRoom: async ({ INFORMATION }) => {
    try {
      INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
      INFORMATION["recentMessage"] = INFORMATION.message;
      INFORMATION["readStatus"] = false;
      INFORMATION["history"] = [];
      INFORMATION["history"].push(INFORMATION.message);
      delete INFORMATION.message;
      const chat = await chatModel.create(INFORMATION);
      chat["status"] = true;
      const userInfo = await userInfoModel.updateOne(
        { userID: INFORMATION.userID },
        { $push: { chatHistry: chat._id } }
      );
      console.log(userInfo);
      const technicianInfo = await userInfoModel.updateOne(
        {
          technicianInfoID: INFORMATION.technicianID,
        },
        { $push: { chatHistry: chat._id } }
      );
      console.log(technicianInfo);
      return chat;
    } catch (error) {
      return { status: false };
    }
  },
  getChatInformation: async (args) => {
    const chatInformation = await chatModel.findOne({
      _id: args.chatID,
      userID: args.userID,
    });
    console.log(chatInformation);
    return chatInformation;
  },
  getChatRoom: async (args) => {
    const user = await userInfoModel.findOne({ userID: args.userID });
    return user.chatHistry;
  },
  chat: async ({ INFORMATION }) => {
    INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
    try {
      const chat = await chatModel.findOneAndUpdate(
        { userID: INFORMATION.userID, _id: INFORMATION.chatID },
        {
          $set: { recentMessage: INFORMATION.message, readStatus: false },
          $push: { history: INFORMATION.message },
        },
        { new: true }
      );
      chat["status"] = true;
      return chat;
    } catch (error) {
      return { status: false };
    }
  },
};
