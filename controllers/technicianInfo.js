const { buildSchema, GraphQLObjectType, GraphQLFloat } = require("graphql");
const technicianInfoModel = require("../models").technicianInformations;
const userInfoModel = require("../models").userInfomations;
const resolver = {
  // insertTechnicianInfo: async ({ INFORMATION }) => {
  //   INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
  //   console.log(INFORMATION);
  //   try {
  //     const information = await technicianInfoModel.create(INFORMATION);
  //     await userInfoModel.updateOne(
  //       { _id: INFORMATION.userInfoID },
  //       {
  //         $set: { role: "technician" },
  //         $push: { technicianInfoID: information._id },
  //       }
  //     );
  //     return information;
  //   } catch (error) {
  //     throw error;
  //   }
  // },
  updateTechnicianInfo: async ({ INFORMATION }, req) => {
    INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
    try {
      const USERINFO = await userInfoModel.findOne({ userID: req.userID });
      const updateInformation = await technicianInfoModel.findOneAndUpdate(
        {
          userInfoID: USERINFO._id,
        },
        {
          $set: {
            aptitude: INFORMATION.aptitude,
            onSite: INFORMATION.onSite,
          },
        },
        { new: true }
      );
      return updateInformation;
    } catch (error) {
      throw error;
    }
  },
  getTechnicianInfo: async (args) => {
    try {
      const TECHNICIANINFO = await technicianInfoModel.findOne({
        _id: args._id,
      });
      return TECHNICIANINFO;
    } catch (error) {
      throw error;
    }
  },
  searchTeachnician: async ({ WORD }) => {
    WORD = JSON.parse(JSON.stringify(WORD));
    console.log(WORD);
    try {
      const searchItem = await technicianInfoModel.find({
        $text: { $search: WORD.word },
      });
      return { technician: searchItem, status: true };
    } catch (error) {
      return { status: false };
    }
  },
};

module.exports = { resolver };
