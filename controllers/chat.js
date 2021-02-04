const chatModel = require("../models").chats;
const userInfoModel = require("../models").userInfomations;
module.exports = {
  createChatRoom: async ({ INFORMATION }, req) => {
    try {
      INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
      const chatInformation = await chatModel.findOne({
        $or: [
          {
            technicianID: INFORMATION.technicianID,
            userID: INFORMATION.message.sender,
          },
          {
            userID: INFORMATION.technicianID,
            technicianID: INFORMATION.message.sender,
          },
        ],
      });

      if (chatInformation === null) {
        const technician = await userInfoModel.findOne({
          userID: INFORMATION.technicianID,
        });
        const user = await userInfoModel.findOne({
          userID: INFORMATION.message.sender,
        });
        INFORMATION["userID"] = user.userID;
        INFORMATION["userAvatar"] = user.avatar;
        INFORMATION["userName"] = user.firstname + " " + user.lastname;
        INFORMATION["technicianName"] = technician.firstname;
        INFORMATION["technicianID"] = INFORMATION.technicianID;
        INFORMATION["technicianAvatar"] = technician.avatar;
        INFORMATION["recentMessage"] = INFORMATION.message;
        INFORMATION["readStatus"] = false;
        INFORMATION["history"] = [INFORMATION.message];
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
      } else {
        const chat = await chatModel.findOneAndUpdate(
          {
            $or: [
              {
                technicianID: INFORMATION.technicianID,
                userID: INFORMATION.message.sender,
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
  getChatInformationByID: async (args, req) => {
    try {
      if (req.role !== null && req.role !== undefined) {
        const chatInformation = await chatModel.findOne({
          _id: args.chatID,
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
        .findOne({
          userID: args.userID,
        })
        .populate({ path: "chatHistry", select: "-history" });
      return user.chatHistry;
    }
  },
  chat: async ({ INFORMATION }, req) => {
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
