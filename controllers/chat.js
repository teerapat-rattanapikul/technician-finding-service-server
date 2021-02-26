const chatModel = require("../models").chats;
const userInfoModel = require("../models").userInfomations;
module.exports = {
  createChatRoom: async ({ INFORMATION }) => {
    try {
      INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
      const chatInformation = await chatModel.findOne({
        $or: [
          {
            technicianID: INFORMATION.technicianID,
            userID: INFORMATION.userID,
          },
          {
            userID: INFORMATION.technicianID,
            technicianID: INFORMATION.userID,
          },
        ],
      });

      if (chatInformation === null) {
        const technician = await userInfoModel.findOne({
          userID: INFORMATION.technicianID,
        });
        const user = await userInfoModel.findOne({
          userID: INFORMATION.userID,
        });
        INFORMATION["userAvatar"] = user.avatar;
        INFORMATION["userName"] = user.firstname;
        INFORMATION["technicianName"] = technician.firstname;
        INFORMATION["technicianID"] = INFORMATION.technicianID;
        INFORMATION["technicianAvatar"] = technician.avatar;
        INFORMATION["readStatus"] = false;
        INFORMATION["history"] = [];
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
      }
      return true;
    } catch (error) {
      return false;
    }
  },
  getChatInformation: async (args, req) => {
    try {
      if (req.role !== null && req.role !== undefined) {
        const chatInformation = await chatModel.findOneAndUpdate(
          {
            $or: [
              { technicianID: args.technicianID, userID: args.userID },
              { userID: args.technicianID, technicianID: args.userID },
            ],
          },
          {
            $set: { readStatus: true },
          },
          { new: true }
        );
        chatInformation["status"] = true;
        return chatInformation;
      }
    } catch (error) {
      return { status: false };
    }
  },
  getChatInformationByID: async (args, req) => {
    try {
      if (req.role !== null && req.role !== undefined) {
        const chatInformation = await chatModel.findOneAndUpdate(
          {
            _id: args.chatID,
          },
          {
            $set: { readStatus: true },
          },
          { new: true }
        );
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
        .findOne({
          userID: args.userID,
        })
        .populate({ path: "chatHistry", select: "-history" });
      return user.chatHistry;
    }
  },
  chat: async ({ INFORMATION }) => {
    try {
      INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
      const chat = await chatModel.updateOne(
        {
          $or: [
            {
              userID: INFORMATION.message.sender,
              technicianID: INFORMATION.technicianID,
            },
            {
              userID: INFORMATION.technicianID,
              technicianID: INFORMATION.message.sender,
            },
          ],
        },
        {
          $set: { recentMessage: INFORMATION.message, readStatus: false },
          $push: { history: INFORMATION.message },
        }
      );
      return true;
    } catch (error) {
      return false;
    }
  },
};
