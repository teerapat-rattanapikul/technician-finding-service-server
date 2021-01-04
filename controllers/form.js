const formModel = require("../models").forms;
const imageModel = require("../models").images;
const fs = require("fs");

module.exports = {
  addForm: async ({ INFORMATION }, req) => {
    try {
      INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
      INFORMATION["date"] = new Date(INFORMATION.date)
        .toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, "");
      INFORMATION["senderID"] = req.userID;
      const information = await formModel.create(INFORMATION);
      console.log(information);
      return information;
    } catch (error) {
      throw error;
    }
  },
  getForm: async (args) => {
    try {
      const form = await formModel.findOne({ _id: args._id });
      return form;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  deleteForm: async ({ INFORMATION }) => {
    try {
      INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
      await formModel.deleteOne({
        title: INFORMATION.title,
        image: INFORMATION.image,
      });
      await imageModel.deleteOne({ img: INFORMATION.image });
      fs.unlinkSync(INFORMATION.image);
      return true;
    } catch (error) {
      return false;
    }
  },
};
