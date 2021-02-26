const userResolver = require("./user");
const userInfoResolver = require("./userInfo");
const technicianInfoResolver = require("./technicianInfo");
const otpResolver = require("./otp");
const formResolver = require("./form");
const chatResolver = require("./chat");
const wordGuideResolver = require("./wordGuide");
const { mergeResolvers } = require("@graphql-tools/merge");
const mainResolver = [
  formResolver,
  otpResolver,
  userResolver,
  userInfoResolver,
  technicianInfoResolver,
  chatResolver,
  wordGuideResolver,
];

module.exports = {
  mergeResolver: mergeResolvers(mainResolver),
};
