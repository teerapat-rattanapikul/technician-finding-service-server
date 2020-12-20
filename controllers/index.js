const userResolver = require("./user");
const userInfoResolver = require("./userInfo");
const technicianInfoResolver = require("./technicianInfo");
const otpResolver = require("./otp");
const formResolver = require("./form");
const imageController = require("./image");

module.exports = {
  formResolver,
  otpResolver,
  userResolver,
  userInfoResolver,
  technicianInfoResolver,
  imageController,
};
