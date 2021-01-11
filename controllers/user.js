const userModel = require("../models").users;
const userInfoModel = require("../models").userInfomations;
const technicianInfoModel = require("../models").technicianInformations;
const vote = require("../helppers/vote");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
const genJWT = require("../services/genJWT");
//const tokenVerify = require("../middlewares/verifyJWT");

module.exports = {
  login: async ({ LOGIN }) => {
    LOGIN = JSON.parse(JSON.stringify(LOGIN));
    const USER = await userModel.findOne({ username: LOGIN.username });
    if (USER) {
      const password = bcrypt.compareSync(LOGIN.password, USER.password);
      try {
        if (password) {
          const userInfo = await userInfoModel.findOne({ userID: USER._id });
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
          };
          const token = genJWT(returnObject);
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
      const information = await userInfoModel.create({
        firstname: REGISTER.firstname,
        lastname: REGISTER.lastname,
        userID: USER._id,
        phone: REGISTER.phone,
        role: REGISTER.role,
        chatHistry: [],
      });
      // link user_information from user
      await userModel.updateOne(
        { _id: USER._id },
        { $set: { userInfoID: information._id } }
      );
      // add technician_information and link user_information from technician_information
      if (REGISTER.role === "technician") {
        const technician = await technicianInfoModel.create({
          aptitude: [
            {
              aptitude: REGISTER.aptitude,
              star: 0,
              amountOfvoteStar: 0,
              amountOfcomment: 0,
            },
          ],
          onSite: REGISTER.onSite,
          address: REGISTER.address,
          description: REGISTER.description,
          userInfoID: information._id,
          star: 0,
          amount: 0,
        });
        //link technician_informaiton from user
        await userInfoModel.updateOne(
          { _id: information._id },
          {
            $set: { role: "technician", technicianInfoID: technician._id },
          }
        );
      }
      return { username: USER.username, status: true };
    } catch (error) {
      return { status: false };
    }
  },
  userVote: async (args) => {
    const technicianInfo = await technicianInfoModel.findOne({
      _id: args.technicianID,
    });

    const voteTechnician = await technicianInfoModel.findOneAndUpdate(
      {
        _id: args.technicianID,
      },
      {
        $set: vote(technicianInfo, args.aptitude, args.voteStar),
      },
      { new: true }
    );
    return voteTechnician;
  },
  // tokenCheck: async (args) => {
  //   const user = tokenVerify(args.token);
  //   try {
  //     if (user.userID !== null && user.userID !== undefined) {
  //       return {
  //         userID: user.userID,
  //         username: user.username,
  //         userInfoID: user.userInfoID,
  //         firstname: user.firstname,
  //         lastname: user.lastname,
  //         phone: user.phone,
  //         role: user.role,
  //         technicianInfoID: user.technicianInfoID,
  //         chatHistry: user.chatHistry,
  //         status: true,
  //       };
  //     } else {
  //       return { status: false };
  //     }
  //   } catch (error) {
  //     return error;
  //   }
  // },
  tokenCheck: async (args, req) => {
    try {
      if (req.userID !== null && req.userID !== undefined) {
        return {
          userID: req.userID,
          username: req.username,
          userInfoID: req.userInfoID,
          firstname: req.firstname,
          lastname: req.lastname,
          phone: req.phone,
          role: req.role,
          technicianInfoID: req.technicianInfoID,
          chatHistry: req.chatHistry,
          status: true,
        };
      } else {
        return { status: false };
      }
    } catch (error) {
      return error;
    }
  },
};
