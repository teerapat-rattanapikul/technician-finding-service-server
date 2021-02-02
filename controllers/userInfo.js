const userInfoModel = require("../models").userInfomations;
module.exports = {
  getInformation: async (args, req) => {
    try {
      console.log(req.userID);
      if (req.role !== null && req.role !== undefined) {
        const result = await userInfoModel
          .findOne({ _id: req.userInfoID })
          .populate("forms");
        console.log(result);
        return result;
      }
    } catch (error) {
      throw error;
    }
  },
  getUserInfo: async (args, req) => {
    try {
      if (req.role !== null && req.role !== undefined) {
        const result = await userInfoModel.findOne({
          userID: args.userID,
        });
        return result;
      }
    } catch (error) {
      throw error;
    }
  },
  getAllInformation: async () => {
    try {
      const result = await userInfoModel.find();
      return result;
    } catch (error) {
      throw error;
    }
  },
  updateInformation: async ({ INFORMATION }, req) => {
    try {
      if (req.role !== null && req.role !== undefined) {
        INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
        const updateInformation = await userInfoModel.findOneAndUpdate(
          {
            userID: req.userID,
          },
          { $set: INFORMATION },
          { new: true }
        );
        return updateInformation;
      }
    } catch (error) {
      throw error;
    }
  },
};
