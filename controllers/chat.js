const chatModel = require("../models").chats;
const userInfoModel = require("../models").userInfomations;
module.exports = {
  createChatRoom: async ({ INFORMATION }) => {
    try {
      INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
      const user = await userInfoModel.findOne({
        userID: INFORMATION.userID,
      });
      const technician = await userInfoModel.findOne({
        userID: INFORMATION.technicianID,
      });
      INFORMATION["userName"] = user.firstname + " " + user.lastname;
      INFORMATION["technicianName"] =
        technician.firstname + " " + technician.lastname;
      INFORMATION["technicianID"] = technician.userID;
      INFORMATION["recentMessage"] = INFORMATION.message;
      INFORMATION["readStatus"] = false;
      INFORMATION["history"] = [];
      INFORMATION["history"].push(INFORMATION.message);

      delete INFORMATION.message;
      const chat = await chatModel.create(INFORMATION);
      chat["status"] = true;
      await userInfoModel.updateOne(
        { userID: INFORMATION.userID },
        { $push: { chatHistry: chat._id } }
      );
      await userInfoModel.updateOne(
        {
          userID: technician.userID,
        },
        { $push: { chatHistry: chat._id } }
      );
      return chat;
    } catch (error) {
      return { status: false };
    }
  },
  getChatInformation: async (args) => {
    try {
      const chatInformation = await chatModel.findOne({
        $or: [
          { technicianID: args.technicianID, userID: args.userID },
          { userID: args.technicianID, technicianID: args.userID },
        ],
      });
      chatInformation["status"] = true;
      return chatInformation;
    } catch (error) {
      return { status: false };
    }
  },
  getChatRoom: async (args) => {
    const user = await userInfoModel
      .findOne({ userID: args.userID })
      .populate({ path: "chatHistry", select: "-history" });
    return user.chatHistry;
  },
  chat: async ({ INFORMATION }) => {
    INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
    try {
      const chat = await chatModel.findOneAndUpdate(
        { userID: INFORMATION.userID, technicianID: INFORMATION.technicianID },
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
