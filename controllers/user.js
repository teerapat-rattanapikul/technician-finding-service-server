const userModel = require("../models").users;
const userInfoModel = require("../models").userInfomations;
const technicianInfoModel = require("../models").technicianInformations;
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
const genJWT = require("../services/genJWT");

module.exports = {
  login: async ({ LOGIN }) => {
    LOGIN = JSON.parse(JSON.stringify(LOGIN));
    const USER = await userModel.findOne({ username: LOGIN.username });
    if (USER) {
      const password = bcrypt.compareSync(LOGIN.password, USER.password);
      try {
        if (password) {
          const userInfo = await userInfoModel
            .findOne({ userID: USER._id })
            .populate({
              path: "forms",
              populate: {
                path: "technician.tech",
                populate: { path: "userInfoID" },
              },
            })
            .populate({
              path: "acceptForms",
              populate: {
                path: "technician.tech",
                populate: { path: "userInfoID" },
              },
            });
          console.log(userInfo);
          const returnObject = {
            userID: USER._id,
            username: USER.username,
            userInfoID: userInfo._id,
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            role: userInfo.role,
            phone: userInfo.phone,
            technicianInfoID: userInfo.technicianInfoID,
            chatHistry: userInfo.chatHistry,
            avatar: userInfo.avatar,
          };
          const token = genJWT(returnObject);
          returnObject["forms"] = userInfo.forms;
          returnObject["acceptForms"] = userInfo.acceptForms;
          returnObject["token"] = token;
          returnObject["status"] = true;
          return returnObject;
        } else {
          return { token: "wrong password", status: false };
        }
      } catch (error) {
        throw error;
      }
    } else {
      return { token: "wrong username", status: false };
    }
  },
  usernameCheck: async (args) => {
    try {
      const USERNAME = await userModel.findOne({ username: args.username });
      if (USERNAME === null) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  },
  register: async ({ REGISTER }) => {
    REGISTER = JSON.parse(JSON.stringify(REGISTER));
    try {
      //add username and password
      REGISTER.password = bcrypt.hashSync(REGISTER.password, salt);
      const USER = await userModel.create({
        username: REGISTER.username,
        password: REGISTER.password,
      });
      // add user_information and link user from sser_information
      const userInfo = await userInfoModel.create({
        firstname: REGISTER.firstname,
        lastname: REGISTER.lastname,
        avatar: REGISTER.avatar,
        userID: USER._id,
        phone: "0" + REGISTER.phone,
        role: "user",
        notification: [],
        chatHistry: [],
        forms: [],
      });
      // link user_information from user
      await userModel.updateOne(
        { _id: USER._id },
        { $set: { userInfoID: userInfo._id } }
      );
      const returnObject = {
        userID: USER._id,
        username: USER.username,
        userInfoID: userInfo._id,
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        role: userInfo.role,
        phone: userInfo.phone,
        technicianInfoID: userInfo.technicianInfoID,
        chatHistry: userInfo.chatHistry,
        avatar: userInfo.avatar,
        forms: userInfo.forms,
      };
      const token = genJWT(returnObject);
      returnObject["token"] = token;
      returnObject["status"] = true;
      return returnObject;
    } catch (error) {
      return { status: false };
    }
  },
  tokenCheck: async (args, req) => {
    try {
      if (req.userID !== null && req.userID !== undefined) {
        const result = {
          userID: req.userID,
          username: req.username,
          userInfoID: req.userInfoID,
          firstname: req.firstname,
          lastname: req.lastname,
          phone: req.phone,
          role: req.role,
          chatHistry: req.chatHistry,
          avatar: req.avatar,
          status: true,
        };
        const userInfo = await userInfoModel
          .findOne({ _id: req.userInfoID })
          .populate({
            path: "forms",
            populate: {
              path: "technician.tech",
              populate: { path: "userInfoID" },
            },
          });

        console.log(userInfo);
        result["forms"] = userInfo.forms;
        if (req.role === "technician") {
          const technicianData = await technicianInfoModel
            .findOne({
              _id: req.technicianInfoID,
            })
            .populate(
              {
                path: "forms",
                populate: {
                  path: "technician.tech",
                  populate: { path: "userInfoID" },
                },
              },
              {
                path: "acceptForms",
                populate: {
                  path: "technician.tech",
                  populate: { path: "userInfoID" },
                },
              }
            )
            .populate("userInfoID");
          result["technicianInfoID"] = technicianData;
        }
        return result;
      } else {
        return { status: false };
      }
    } catch (error) {
      return error;
    }
  },
};
