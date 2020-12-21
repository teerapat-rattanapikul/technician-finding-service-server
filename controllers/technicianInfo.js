const { buildSchema, GraphQLObjectType, GraphQLFloat } = require("graphql");
const technicianInfoModel = require("../models").technicianInformations;
const userInfoModel = require("../models").userInfomations;
module.exports = {
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
    var distance = 0.05;
    var searchData = [];
    try {
      while (searchData.length === 0) {
        searchData = await technicianInfoModel.find({
          $text: { $search: WORD.word },
          "address.lat": {
            $gte: WORD.address.lat - distance,
            $lt: WORD.address.lat + distance,
          },
          "address.lon": {
            $gte: WORD.address.lon - distance,
            $lt: WORD.address.lon + distance,
          },
        });
        console.log(searchData);
        console.log(distance);
        distance += 0.05;
      }
      return { technician: searchData, status: true };
    } catch (error) {
      return { status: false };
    }
  },
};
