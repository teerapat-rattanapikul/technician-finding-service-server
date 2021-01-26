const userInfoModel = require("../models").userInfomations;
module.exports = {
  getInformation: async (args, req) => {
    try {
      if (req.role !== null && req.role !== undefined) {
        const result = await userInfoModel.findOne({ _id: req.userInfoID });
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
