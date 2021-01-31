const formModel = require("../models").forms;
const userInfoModel = require("../models").userInfomations;
const technicianModel = require("../models").technicianInformations;
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
  formActiveFalse: async (args, req) => {
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
  deleteForm: async (args, req) => {
    try {
      if (req.role !== null && req.role !== undefined) {
        INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
        await formModel.deleteOne({
          _id: args.formID,
        });
        return true;
      }
    } catch (error) {
      return false;
    }
  },
  techAcceptForm: async ({ INFORMATION }) => {
    try {
      const technician = await technicianModel.findOne({
        userID: INFORMATION.technician.tech,
      });

      const saveTech = await technicianController.saveWaitingForm({
        formID: INFORMATION.formID,
        userID: INFORMATION.technician.tech,
      });
      INFORMATION.technician.tech = technician._id;
      INFORMATION.technician["location"] = {
        lat: technician.address.lat,
        lon: technician.address.lon,
      };
      var result = {};
      if (saveTech) {
        result = await formModel
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

      return result;
    } catch (error) {
      throw error;
    }
  },
  techIgnoreForm: async (args) => {
    try {
      const ignoreTech = await technicianController.ignoreForm({
        formID: args.formID,
        userID: args.userID,
      });
      return ignoreTech;
    } catch (error) {
      return false;
    }
  },
  userAcceptForm: async (args) => {
    try {
      const saveTech = await technicianController.saveAcceptForm({
        formID: args.formID,
        userID: args.technician.tech,
      });
      return true;
    } catch (error) {
      return false;
    }
  },
  userIgnoreForm: async (args, req) => {
    try {
      if (req.role !== null && req.role !== undefined) {
        await technicianModel.updateOne(
          { userID: args.userID },
          { $pull: { waitingForm: { $in: args.formID } } }
        );
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  },
};
