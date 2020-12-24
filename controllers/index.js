const userResolver = require("./user");
const userInfoResolver = require("./userInfo");
const technicianInfoResolver = require("./technicianInfo");
const otpResolver = require("./otp");
const formResolver = require("./form");
const imageController = require("./image");
const { mergeResolvers } = require("@graphql-tools/merge");
const mainResolver = [
  formResolver,
  otpResolver,
  userResolver,
  userInfoResolver,
  technicianInfoResolver,
];

const mergeResolver = mergeResolvers(mainResolver);
module.exports = {
  mergeResolver,
  imageController,
};
