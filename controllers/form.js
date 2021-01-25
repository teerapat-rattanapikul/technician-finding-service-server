const formModel = require("../models").forms;
const userInfoModel = require("../models").userInfomations;
const technicianController = require("../controllers/technicianInfo");

//add me
module.exports = {
  addForm: async ({ INFORMATION }) => {
    try {
      INFORMATION["active"] = true;
      INFORMATION["technician"] = [];
      var information = {};
      const userInfo = await userInfoModel.findOne({
        userID: INFORMATION.senderID,
      });
      INFORMATION["userInfoID"] = userInfo._id;
      await formModel.create(INFORMATION).then(async (result) => {
        information = await formModel
          .findById(result._id)
          .populate("userInfoID");
      });
      console.log(information);
      await userInfoModel.updateOne(
        { _id: userInfo._id },
        { $push: { forms: information._id } }
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
  acceptForm: async ({ INFORMATION }) => {
    try {
      const saveTech = await technicianController.saveAcceptForm({
        formID: INFORMATION.formID,
        technicianID: INFORMATION.technician.tech,
      });
      if (saveTech) {
        const result = await formModel
          .findOneAndUpdate(
            { _id: INFORMATION.formID },
            { $push: { technician: INFORMATION.technician } },
            { new: true }
          )
          .populate({
            path: "technician",
            populate: {
              path: "tech",
              select: "userInfoID",
              populate: { path: "userInfoID" },
            },
          });
      }

      return true;
    } catch (error) {
      throw error;
    }
  },
};
