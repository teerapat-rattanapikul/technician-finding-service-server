const userInfoModel = require("../models").userInfomations;
const formController = require("../controllers/form");
const technicianController = require("../controllers/technicianInfo");
var twilio = require("twilio");
var accountSid = "AC4c7bab831d608ed2b40150be4c57d0c2"; // Your Account SID from www.twilio.com/console
var authToken = "e8aa8fa7a981f3639d13b52c7800430e"; // Your Auth Token from www.twilio.com/console
var otpGenerator = require("otp-generator");
var twilio = require("twilio");
var client = new twilio(accountSid, authToken);
module.exports = {
  sendOTP: async (args) => {
    try {
      const otpGen = await otpGenerator.generate(6, {
        alphabets: false,
        upperCase: false,
        specialChars: false,
      });
      const phoneNumber = "+66" + args.phone;
      //   await client.messages
      //     .create({
      //       body: otpGen,
      //       to: "+66643300584", // Text this number
      //       from: "+14055443804 ", // From a valid Twilio number
      //     })
      //     .then((message) => console.log(message.sid));
      return otpGen;
    } catch (error) {
      throw error;
    }
  },
  phoneCheck: async (args) => {
    try {
      const checkMatchPhone = await userInfoModel.findOne({
        phone: args.phone,
      });

      if (checkMatchPhone === null) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  },
  test: async () => {
    const result = await formController.userAcceptForm({
      formID: "60190d33c9a673218e2d7859",
      userID: "600890275aa3af18f0f3fe37",
      techID: "5ffed8b7c2aad77514888d96",
    });
    return true;
  },
};
