const formModel = require("../models").forms;
const fs = require("fs");
//add me
module.exports = {
  addForm: async ({ INFORMATION }, req) => {
    try {
      if (req.role !== null && req.role !== undefined) {
        INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
        INFORMATION["senderID"] = req.userID;
        console.log(INFORMATION);
        const information = await formModel.create(INFORMATION);
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
