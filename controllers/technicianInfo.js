const technicianInfoModel = require("../models").technicianInformations;
const userInfoModel = require("../models").userInfomations;
const userModel = require("../models").users;
const vote = require("../helppers/vote");
const sortTechnician = require("../helppers/sortTechnician");
const checkWorkActive = require("../helppers/checkWorkActive");
module.exports = {
  insertTechnicianInfo: async ({ INFORMATION }, req) => {
    try {
      if (req.role !== null && req.role !== undefined) {
        INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
        var value = {};
        var technicianInfo = {};
        const loop = INFORMATION.aptitude;
        value["amountOfvoteStar"] = 0;
        value["amountOfcomment"] = 0;
        value["star"] = 0;
        value["voteID"] = [];
        value["workTime"] = INFORMATION.workTime;
        loop.forEach(async (APTITUDE) => {
          value["aptitude"] = APTITUDE;
          INFORMATION.aptitude = [value];
          technicianInfo = await technicianInfoModel.updateOne(
            {
              userInfoID: req.userInfoID,
            },
            { $push: { aptitude: INFORMATION.aptitude } }
          );
        });
        technicianInfo["status"] = true;
        return technicianInfo;
      } else {
        return { status: false };
      }
    } catch (error) {
      throw error;
    }
  },
  createTechnicianInfo: async ({ INFORMATION }, req) => {
    try {
      if (req.role !== null && req.role !== undefined) {
        INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
        var data = INFORMATION.aptitude;
        INFORMATION.aptitude = [];
        INFORMATION["star"] = 0;
        INFORMATION["amount"] = 0;
        INFORMATION["userID"] = req.userID;
        INFORMATION["userInfoID"] = req.userInfoID;
        INFORMATION["comment"] = [];
        INFORMATION["newForm"] = [];
        INFORMATION["acceptForm"] = [];
        console.log(INFORMATION);
        data.forEach(async (APTITUDE) => {
          var value = {
            amountOfvoteStar: 0,
            amountOfcomment: 0,
            star: 0,
            aptitude: APTITUDE,
            voteID: [],
            workTime: INFORMATION.workTime,
          };
          INFORMATION.aptitude.push(value);
        });
        console.log(INFORMATION);
        technicianInfo = await technicianInfoModel.create(INFORMATION);
        await userInfoModel.updateOne(
          { _id: req.userInfoID },
          {
            $set: {
              role: "technician",
              technicianInfoID: technicianInfo._id,
            },
          }
        );
        await userModel.updateOne(
          { _id: req.userID },
          { $set: { technicianInfoID: technicianInfo._id } }
        );
        afterCreate = true;
        technicianInfo["status"] = true;
        return technicianInfo;
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
            userID: args.userID,
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
    console.log(args);
    try {
      if (req.role !== null && req.role !== undefined) {
        const technicianInfo = await technicianInfoModel.findOne({
          userID: args.userID,
        });
        const voting = vote(
          technicianInfo,
          args.aptitude,
          args.voteStar,
          req.userID
        );
        if (voting !== false) {
          const voteTechnician = await technicianInfoModel
            .findOneAndUpdate(
              {
                userID: args.userID,
              },
              {
                $set: voting,
              },
              { new: true }
            )
            .populate("userInfoID");
          voteTechnician["status"] = true;
          return voteTechnician;
        } else {
          return { status: false };
        }
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
            { userID: args.userID },
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
  fromSearchTech: async (args) => {
    try {
      const DAY = new Date(args.date).getDay();
      const HOUR = new Date(args.date).getHours();
      const MINUTE = new Date(args.date).getMinutes();
      var area = 0.05;
      var searchData = [];
      while (searchData.length <= 2 && area < 2.0) {
        const Tech = await technicianInfoModel
          .find({
            $text: { $search: args.word },
            "address.lat": {
              $gte: args.lat - area,
              $lt: args.lat + area,
            },
            "address.lon": {
              $gte: args.lon - area,
              $lt: args.lon + area,
            },
          })
          .populate("userInfoID");
        searchData = [];
        Tech.map((tech) => {
          tech.aptitude
            .filter((APTITUDE) => {
              APTITUDE.aptitude === args.word &&
                APTITUDE.workDay.includes(DAY) &&
                checkWorkActive(APTITUDE.workTime.start, APTITUDE.workTime.end);
            })
            .map(() => {
              searchData.push(tech);
            });
        });
        area += 0.05;
      }
      return { technician: sortTechnician(searchData), status: true };
    } catch (error) {
      return { status: false };
    }
  },
  saveNewForm: async (args) => {
    try {
      args.technician.forEach(async (tech) => {
        await technicianInfoModel.updateOne(
          { _id: tech._id },
          { $push: { newForm: args.formID } }
        );
      });
      return true;
    } catch (error) {
      throw error;
    }
  },
  saveAcceptForm: async (args) => {
    try {
      await technicianInfoModel.updateOne(
        { _id: uesrID },
        { $push: { acceptForm: args.formID }, $set: { newForm: [] } }
      );
    } catch (error) {}
  },
};
