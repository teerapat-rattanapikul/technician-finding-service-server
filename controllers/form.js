const formModel = require("../models").forms;
const userInfoModel = require("../models").userInfomations;
const fs = require("fs");
//add me
module.exports = {
  addForm: async ({ INFORMATION }) => {
    try {
      INFORMATION["active"] = true;
      const information = await formModel.create(INFORMATION);
      await userInfoModel.updateOne(
        { userID: INFORMATION.senderID },
        { $push: { $forms: information._id } }
      );
      return information;
    } catch (error) {
      throw error;
    }
  },
  getForm: async (args, req) => {
    try {
      if (req.role !== null && req.role !== undefined) {
        const form = await formModel.findOne({
          _id: args.formID,
          active: true,
        });
        return form;
      }
    } catch (error) {
      return error;
    }
  },
  deleteForm: async (args, req) => {
    try {
      if (req.role !== null && req.role !== undefined) {
        INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
        await formModel.updateOne(
          {
            _id: args.formID,
          },
          { $set: { active: false } }
        );
        return true;
      }
    } catch (error) {
      return false;
    }
  },
};
