const formModel = require("../models").forms;

const userInfoModel = require("../models").userInfomations;
const technicianInfoModel = require("../models").technicianInformations;
const technicianController = require("../controllers/technicianInfo");

//add me
module.exports = {
  addForm: async ({ INFORMATION }) => {
    try {
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
        });
        return form;
      }
    } catch (error) {
      return error;
    }
  },
  deleteForm: async (args) => {
    try {
      await formModel.deleteOne(
        {
          _id: args.formID,
        },
        { new: true }
      );
      await userInfoModel.updateOne(
        {
          forms: args.formID,
        },
        { $pull: { forms: { $in: args.formID } } }
      );
      await technicianInfoModel.updateMany(
        {
          $or: [
            { newForm: args.formID },
            { waitingForm: args.formID },
            { acceptForm: args.formID },
          ],
        },
        {
          $pull: {
            newForm: { $in: args.formID },
            waitingForm: { $in: args.formID },
            acceptForm: { $in: args.formID },
          },
        }
      );

      return true;
    } catch (error) {
      return false;
    }
  },
  clearForm: async (args, req) => {
    try {
      if (req.role !== null && req.role !== undefined) {
        await formModel.deleteMany();
        await userInfoModel.updateMany({}, { $set: { forms: [] } });
        await technicianInfoModel.updateMany(
          {},
          { $set: { newForm: [], waitingForm: [], acceptForm: [] } }
        );

        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  },
  techAcceptForm: async ({ INFORMATION }, req) => {
    try {
      const technician = await technicianInfoModel.findOne({
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
  techIgnoreForm: async (args, req) => {
    try {
      if (req.role !== null && req.role !== undefined) {
        const ignoreTech = await technicianController.ignoreForm({
          formID: args.formID,
          userID: args.userID,
        });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  },
  userAcceptForm: async (args, req) => {
    try {
      await technicianController.saveAcceptForm({
        formID: args.formID,
        userID: args.techID,
      });
      await userInfoModel.updateOne(
        { userID: args.userID },
        {
          $push: { acceptForms: args.formID },
          $pull: { forms: { $in: args.formID } },
        }
      );
      return true;
    } catch (error) {
      throw error;
    }
  },
  userIgnoreForm: async (args, req) => {
    try {
      if (req.role !== null && req.role !== undefined) {
        await technicianInfoModel.updateOne(
          { userID: args.userID },
          { $pull: { waitingForm: { $in: args.formID } } }
        );
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  },
};
