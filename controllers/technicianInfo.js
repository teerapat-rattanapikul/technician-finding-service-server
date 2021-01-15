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
        INFORMATION["comment"] = [];
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
        const updateInformation = await technicianInfoModel.findOneAndUpdate(
          {
            userInfoID: req.userInfoID,
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
        console.log(TECHNICIANINFO);
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
            const returnData = element.technicianInfoID;
            element.technicianInfoID = undefined;
            returnData["userInfoID"] = element;
            returnData.userInfoID["technicianInfoID"] = returnData._id;
            searchData.push(returnData);
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
  userVote: async (args, req) => {
    try {
      if (req.role !== null && req.role !== undefined) {
        const technicianInfo = await technicianInfoModel.findOne({
          _id: args.technicianID,
        });

        const voteTechnician = await technicianInfoModel
          .findOneAndUpdate(
            {
              _id: args.technicianID,
            },
            {
              $set: vote(technicianInfo, args.aptitude, args.voteStar),
            },
            { new: true }
          )
          .populate("userInfoID");
        voteTechnician["status"] = true;
        return voteTechnician;
      } else {
        return { status: false };
      }
    } catch (error) {
      throw error;
    }
  },
  userComment: async (args, req) => {
    try {
      if (req.userID !== null && req.userID !== undefined) {
        const technicianUpdate = technicianInfoModel
          .findOneAndUpdate(
            { _id: args._id },
            {
              $push: { comment: { userID: req.userID, comment: args.comment } },
            },
            { new: true }
          )
          .populate("userInfoID");
        technicianUpdate["status"] = true;
        return technicianUpdate;
      }
      return { status: false };
    } catch (error) {
      return error;
    }
  },
};
