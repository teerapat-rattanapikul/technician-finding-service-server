const { buildSchema, GraphQLObjectType, GraphQLFloat } = require("graphql");
const technicianInfoModel = require("../models").technicianInformations;
const userInfoModel = require("../models").userInfomations;
const sortTechnician = require("../helppers/sortTechnician");
module.exports = {
  insertTechnicianInfo: async ({ INFORMATION }, req) => {
    INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
    try {
      const USERINFO = await userInfoModel.findOne({ userID: req.userID });
      INFORMATION["userInfoID"] = USERINFO._id;
      INFORMATION["amountOfvoteStar"] = 0;
      INFORMATION["amountOfcomment"] = 0;
      INFORMATION["star"] = 0;
      const information = await technicianInfoModel.create(INFORMATION);
      await userInfoModel.updateOne(
        { _id: USERINFO._id },
        {
          $set: { role: "technician" },
          $push: { technicianInfoID: information._id },
        }
      );
      return information;
    } catch (error) {
      throw error;
    }
  },
  updateTechnicianInfo: async ({ INFORMATION }, req) => {
    INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
    const TECHNICIANID = INFORMATION.technicianID;
    try {
      const USERINFO = await userInfoModel.findOne({ userID: req.userID });
      const updateInformation = await technicianInfoModel.findOneAndUpdate(
        {
          userInfoID: USERINFO._id,
          _id: TECHNICIANID,
        },
        {
          $set: INFORMATION,
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
    var area = 0.05;
    var searchData = [];
    try {
      while (searchData.length === 0 && area < 1.0) {
        searchData = await technicianInfoModel.find({
          $text: { $search: WORD.word },
          "address.lat": {
            $gte: WORD.address.lat - area,
            $lt: WORD.address.lat + area,
          },
          "address.lon": {
            $gte: WORD.address.lon - area,
            $lt: WORD.address.lon + area,
          },
        });

        area += 0.05;
      }
      return { technician: sortTechnician(searchData), status: true };
    } catch (error) {
      return { status: false };
    }
  },
  getNearTeachnician: async ({ ADDRESS }) => {
    ADDRESS = JSON.parse(JSON.stringify(ADDRESS));
    var area = 0.05;
    var searchData = [];
    try {
      while (searchData.length <= 2 && area < 4.0) {
        searchData = await technicianInfoModel.find({
          "address.lat": {
            $gte: ADDRESS.address.lat - area,
            $lt: ADDRESS.address.lat + area,
          },
          "address.lon": {
            $gte: ADDRESS.address.lon - area,
            $lt: ADDRESS.address.lon + area,
          },
        });
        area += 0.05;
      }
      return { technician: searchData, status: true };
    } catch (error) {
      return { status: false };
    }
  },
};
