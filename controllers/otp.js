const otpModel = require("../models").otps;
const userInfoModel = require("../models").userInfomations;
const genJWT = require("../services/genJWT");
var twilio = require("twilio");
var accountSid = "AC4c7bab831d608ed2b40150be4c57d0c2"; // Your Account SID from www.twilio.com/console
var authToken = "e8aa8fa7a981f3639d13b52c7800430e"; // Your Auth Token from www.twilio.com/console
var otpGenerator = require("otp-generator");
var twilio = require("twilio");
var client = new twilio(accountSid, authToken);
const resolver = {
  sendOTP: async (args) => {
    try {
      const otpGen = await otpGenerator.generate(6, {
        alphabets: false,
        upperCase: false,
        specialChars: false,
      });
      const phoneNumber = args.phone.replace("0", "66");
      //   await client.messages
      //     .create({
      //       body: otpGen,
      //       to: "+66643300584", // Text this number
      //       from: "+14055443804 ", // From a valid Twilio number
      //     })
      //     .then((message) => console.log(message.sid));
      // const result = await otpModel.create({ code: otpGen });
      console.log(otpGen);
      return { status: true };
    } catch (error) {
      return { status: false };
    }
  },
  getOTP: async ({ AUT }) => {
    AUT = JSON.parse(JSON.stringify(AUT));
    try {
      const result = await otpModel.findOneAndRemove({ code: AUT.code });
      if (result !== null) {
        return { status: true };
      }
      return { status: false };
    } catch (error) {
      return { status: false };
    }
  },
};

module.exports = { resolver };
