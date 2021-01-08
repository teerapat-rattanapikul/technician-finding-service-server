const userResolver = require("./user");
const userInfoResolver = require("./userInfo");
const technicianInfoResolver = require("./technicianInfo");
const otpResolver = require("./otp");
const formResolver = require("./form");
const formController = require("./uploadForm");
const chatResolver = require("./chat");
const { mergeResolvers } = require("@graphql-tools/merge");
const mainResolver = [
  formResolver,
  otpResolver,
  userResolver,
  userInfoResolver,
  technicianInfoResolver,
  chatResolver,
];

module.exports = {
  mergeResolver: mergeResolvers(mainResolver),
  formController,
};
