const formModel = require("../models").forms;
const userInfoModel = require("../models").userInfomations;
const fs = require("fs");
//add me
module.exports = {
  addForm: async ({ INFORMATION }, req) => {
    console.log(INFORMATION);
    try {
      if (req.role !== null && req.role !== undefined) {
        INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
        INFORMATION["senderID"] = req.userID;
        const information = await formModel.create(INFORMATION);
        await userInfoModel.updateOne(
          { _id: req.userID },
          { $push: { $forms: information._id } }
        );
        return information;
      }
    } catch (error) {
      throw error;
    }
  },
  getForm: async (args, req) => {
    try {
      if (req.role !== null && req.role !== undefined) {
        const form = await formModel.findOne({ _id: args._id });
        return form;
      }
    } catch (error) {
      return error;
    }
  },
  deleteForm: async ({ INFORMATION }, req) => {
    try {
      if (req.role !== null && req.role !== undefined) {
        INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
        await formModel.deleteOne({
          title: INFORMATION.title,
          image: INFORMATION.image,
        });
        fs.unlinkSync(INFORMATION.image);
        return true;
      }
    } catch (error) {
      return false;
    }
  },
};
