const { buildSchema, GraphQLObjectType, GraphQLFloat } = require("graphql");
const userInfoModel = require("../models").userInfomations;
const userModel = require("../models").users;

const resolver = {
  insertInformation: async ({ INFORMATION }) => {
    INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
    try {
      const information = await userInfoModel.create(INFORMATION);
      console.log(information);
      await userModel.updateOne(
        { _id: INFORMATION.userID },
        { $set: { userInfoID: information._id } }
      );
      return information;
    } catch (error) {
      throw error;
    }
  },
  getInformation: async (args, req) => {
    try {
      const result = await userInfoModel.findById({ _id: req.userInfo });
      return result;
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
    INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
    try {
      const updateInformation = await userInfoModel.findOneAndUpdate(
        {
          userID: req.userID,
        },
        { $set: INFORMATION },
        { new: true }
      );
      return updateInformation;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = { resolver };
