const { buildSchema, GraphQLObjectType, GraphQLFloat } = require("graphql");
const technicianInfoModel = require("../models").technicianInformations;
const userInfoModel = require("../models").userInfomations;
const technicianValueModel = require("../models").technicianValues;
const sortTechnician = require("../helppers/sortTechnician");
module.exports = {
  insertTechnicianInfo: async ({ INFORMATION }, req) => {
    INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
    try {
      const USERINFO = await userInfoModel.findOne({ userID: req.userID });
      INFORMATION["userInfoID"] = USERINFO._id;
      var value = {};
      value["aptitude"] = INFORMATION.aptitude;
      value["amountOfvoteStar"] = 0;
      value["amountOfcomment"] = 0;
      value["star"] = 0;
      INFORMATION.aptitude = [value];
      await technicianInfoModel.updateOne(
        {
          userInfoID: INFORMATION.userInfoID,
        },
        { $push: { aptitude: INFORMATION } }
      );
      await userInfoModel.updateOne(
        { _id: USERINFO._id },
        {
          $set: { role: "technician", technicianInfoID: information._id },
        }
      );
      return information;
    } catch (error) {
      throw error;
    }
  },
  updateTechnicianInfo: async ({ INFORMATION }, req) => {
    INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
    try {
      const USERINFO = await userInfoModel.findOne({ userID: req.userID });
      const updateInformation = await technicianInfoModel.findOneAndUpdate(
        {
          userInfoID: USERINFO._id,
          _id: INFORMATION.technicianID,
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
  searchTechnician: async ({ WORD }) => {
    WORD = JSON.parse(JSON.stringify(WORD));
    console.log(WORD);
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
  getNearTechnician: async ({ ADDRESS }) => {
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
