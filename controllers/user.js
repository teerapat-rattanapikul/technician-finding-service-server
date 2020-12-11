const userModel = require("../models").users;
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
const genJWT = require("../services/genJWT");

const resolver = {
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
            userInfo: USER.userInfoID,
          });
          return { token };
        } else {
          return { token: "wrong password" };
        }
      } catch (error) {
        throw error;
      }
    } else {
      return { token: "wrong username" };
    }
  },
  register: async ({ REGISTER }) => {
    REGISTER = JSON.parse(JSON.stringify(REGISTER));
    const checkUser = await userModel.findOne({ username: REGISTER.username });
    try {
      if (checkUser === null) {
        REGISTER.password = bcrypt.hashSync(REGISTER.password, salt);
        const USER = await userModel.create({
          username: REGISTER.username,
          password: REGISTER.password,
        });
        try {
          return USER;
        } catch (error) {
          throw error;
        }
      } else {
        return { username: "มี ชื่อผู้ใช้งาน นี้แล้ว" };
      }
    } catch (error) {
      throw error;
    }
  },
};

module.exports = { resolver };
