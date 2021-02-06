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
