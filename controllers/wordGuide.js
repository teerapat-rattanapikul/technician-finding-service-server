const userInfoModel = require("../models").userInfomations;
const formController = require("../controllers/form");
const technicianController = require("../controllers/technicianInfo");
var twilio = require("twilio");
var accountSid = "AC4c7bab831d608ed2b40150be4c57d0c2"; // Your Account SID from www.twilio.com/console
const wordGuideModel = require("../models").words;
module.exports = {
  wordGuide: async (args, req) => {
    try {
      if (req.userID !== null && req.userID !== undefined) {
        const wordGuide = await wordGuideModel.findOne();
        const result = wordGuide.word.filter((words) =>
          words.includes(args.word)
        );

        return result;
      } else {
        return [];
      }
    } catch (error) {
      throw error;
    }
  },
};
