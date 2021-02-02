const chatModel = require("../models").chats;
const userInfoModel = require("../models").userInfomations;
module.exports = {
  createChatRoom: async ({ INFORMATION }, req) => {
    try {
      if (req.role !== null && req.role !== undefined) {
        INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
        console.log(INFORMATION);
        // const technician = await userInfoModel.findOne({
        //   userID: INFORMATION.technicianID,
        // });
        // INFORMATION["userID"] = req.userID;
        // INFORMATION["userAvatar"] = req.avatar;
        // INFORMATION["userName"] = req.firstname + " " + req.lastname;
        // INFORMATION["technicianName"] = technician.firstname;
        // INFORMATION["technicianID"] = technician.userID;
        // INFORMATION["technicianAvatar"] = technician.avatar;
        // INFORMATION.message["sender"] = req.userID;
        // INFORMATION["recentMessage"] = INFORMATION.message;
        // INFORMATION["readStatus"] = false;
        // INFORMATION["history"] = [];
        // INFORMATION["history"].push(INFORMATION.message);
        // delete INFORMATION.message;
        // const chat = await chatModel.create(INFORMATION);
        // chat["status"] = true;

        // await userInfoModel.updateOne(
        //   { userID: INFORMATION.userID },
        //   { $push: { chatHistry: chat._id } }
        // );
        // await userInfoModel.updateOne(
        //   {
        //     userID: technician.userID,
        //   },
        //   { $push: { chatHistry: chat._id } }
        // );
        return chat;
      }
    } catch (error) {
      return { status: false };
    }
  },
  getChatInformation: async (args, req) => {
    try {
      if (req.role !== null && req.role !== undefined) {
        const chatInformation = await chatModel.findOne({
          $or: [
            { technicianID: args.technicianID, userID: args.userID },
            { userID: args.technicianID, technicianID: args.userID },
          ],
        });
        chatInformation["status"] = true;
        return chatInformation;
      }
    } catch (error) {
      return { status: false };
    }
  },
  getChatRoom: async (args, req) => {
    if (req.role !== null && req.role !== undefined) {
      const user = await userInfoModel
        .findOne({ userID: args.userID })
        .populate({ path: "chatHistry", select: "-history" });
      return user.chatHistry;
    }
  },
  chat: async ({ INFORMATION }, req) => {
    try {
      if (req.role !== null && req.role !== undefined) {
        INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
        const chat = await chatModel.findOneAndUpdate(
          {
            userID: INFORMATION.userID,
            technicianID: INFORMATION.technicianID,
          },
          {
            $set: { recentMessage: INFORMATION.message, readStatus: false },
            $push: { history: INFORMATION.message },
          },
          { new: true }
        );
        chat["status"] = true;
        return chat;
      }
    } catch (error) {
      return { status: false };
    }
  },
};
