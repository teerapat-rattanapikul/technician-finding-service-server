const technicianInfoModel = require("../models").technicianInformations;
const userInfoModel = require("../models").userInfomations;
const sortTechnician = require("../helppers/sortTechnician");
module.exports = {
  insertTechnicianInfo: async ({ INFORMATION }, req) => {
    try {
      if (req.role !== null && req.role !== undefined) {
        INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
        var value = {};
        var technicianInfo = {};
        value["aptitude"] = INFORMATION.aptitude;
        value["amountOfvoteStar"] = 0;
        value["amountOfcomment"] = 0;
        value["star"] = 0;
        INFORMATION.aptitude = [value];
        if (req.role === "user") {
          const USERINFO = await userInfoModel.findOne({ userID: req.userID });
          INFORMATION["star"] = 0;
          INFORMATION["amount"] = 0;
          INFORMATION["userInfoID"] = req.userInfoID;
          technicianInfo = await technicianInfoModel.create(INFORMATION);
          await userInfoModel.updateOne(
            { _id: USERINFO._id },
            {
              $set: {
                role: "technician",
                technicianInfoID: technicianInfo._id,
              },
            }
          );
        } else if (req.role === "technician") {
          technicianInfo = await technicianInfoModel.updateOne(
            {
              userInfoID: req.userInfoID,
            },
            { $push: { aptitude: INFORMATION.aptitude } }
          );
        }
        technicianInfo["status"] = true;
        return technicianInfo;
      } else {
        return { status: false };
      }
    } catch (error) {
      throw error;
    }
  },
  updateTechnicianInfo: async ({ INFORMATION }, req) => {
    try {
      if (req.role === "technician") {
        INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
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
        updateInformation["status"] = true;
        return updateInformation;
      } else {
        return { status: false };
      }
    } catch (error) {
      throw error;
    }
  },
  getTechnicianInfo: async (args, req) => {
    try {
      if (req.role !== null && req.role !== undefined) {
        const TECHNICIANINFO = await technicianInfoModel
          .findOne({
            _id: args._id,
          })
          .populate("userInfoID");
        TECHNICIANINFO["status"] = true;
        return TECHNICIANINFO;
      } else {
        return { status: false };
      }
    } catch (error) {
      throw error;
    }
  },
  searchTechnician: async (args, req) => {
    try {
      var searchData = {};
      if (req.role !== null && req.role !== undefined) {
        searchData = await technicianInfoModel
          .find({
            $text: { $search: args.word },
          })
          .populate("userInfoID");
        if (searchData.length === 0) {
          const userInfo = await userInfoModel
            .find({
              $text: { $search: args.word },
            })
            .populate("technicianInfoID");
          userInfo.forEach((element) => {
            const returndata = element.technicianInfoID;
            element.technicianInfoID = undefined;
            returndata["userInfoID"] = element;
            searchData.push(returndata);
          });
        }
        return { technician: sortTechnician(searchData), status: true };
      } else {
        return { status: false };
      }
    } catch (error) {
      return { status: false };
    }
  },
  getNearTechnician: async ({ ADDRESS }, req) => {
    try {
      if (req.role !== null && req.role !== undefined) {
        ADDRESS = JSON.parse(JSON.stringify(ADDRESS));
        var area = 0.05;
        var searchData = [];
        while (searchData.length <= 2 && area < 4.0) {
          searchData = await technicianInfoModel
            .find({
              "address.lat": {
                $gte: ADDRESS.address.lat - area,
                $lt: ADDRESS.address.lat + area,
              },
              "address.lon": {
                $gte: ADDRESS.address.lon - area,
                $lt: ADDRESS.address.lon + area,
              },
            })
            .populate("userInfoID");
          area += 0.05;
        }
        return { technician: searchData, status: true };
      } else {
        return { status: false };
      }
    } catch (error) {
      return { status: false };
    }
  },
};
