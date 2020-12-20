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
  register: async ({ REGISTER }) => {
    REGISTER = JSON.parse(JSON.stringify(REGISTER));
    const checkUser = await userModel.findOne({ username: REGISTER.username });
    try {
      if (checkUser === null) {
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
          address: REGISTER.address,
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
      } else {
        return { username: "มี ชื่อผู้ใช้งาน นี้แล้ว", status: false };
      }
    } catch (error) {
      throw error;
    }
  },
};
