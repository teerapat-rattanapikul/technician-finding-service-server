const userModel = require("../models").users;
const userInfoModel = require("../models").userInfomations;
const technicianInfoModel = require("../models").technicianInformations;
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
const genJWT = require("../services/genJWT");

module.exports = {
  login: async ({ LOGIN }) => {
    LOGIN = JSON.parse(JSON.stringify(LOGIN));
    console.log(LOGIN);
    const USER = await userModel.findOne({ username: LOGIN.username });
    if (USER) {
      const password = bcrypt.compareSync(LOGIN.password, USER.password);
      try {
        if (password) {
          const token = genJWT({
            userID: USER._id,
            username: USER.username,
            userInfoID: USER.userInfoID,
          });
          const userInfo = await userInfoModel.findOne({ userID: USER._id });
          console.log(userInfo);
          return {
            token,
            status: true,
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            role: userInfo.role,
            userID: userInfo.userID,
          };
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
    console.log(REGISTER);
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
      });
      // link user_information from user
      await userModel.updateOne(
        { _id: USER._id },
        { $set: { userInfoID: information._id } }
      );
      // add technician_information and link user_information from technician_information
      if (REGISTER.role === "technician") {
        const technician = await technicianInfoModel.create({
          aptitude: REGISTER.aptitude,
          onSite: REGISTER.onSite,
          address: REGISTER.address,
          description: REGISTER.description,
          userInfoID: information._id,
        });
        //link technician_informaiton from user
        await userInfoModel.updateOne(
          { _id: information._id },
          {
            $set: { role: "technician" },
            $push: { technicianInfoID: technician._id },
          }
        );
      }
      return { username: USER.username, status: true };
    } catch (error) {
      return { status: false };
    }
  },
};
