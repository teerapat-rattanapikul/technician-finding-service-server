const wordGuideModel = require("../models").words;
module.exports = {
  wordGuide: async (args, req) => {
    try {
      if (req.userID !== null && req.userID !== undefined) {
        const findWord = await wordGuideModel.find({
          word: { $regex: args.word, $options: "i" },
        });
        const result = findWord.map((data) => data.word);
        return result;
      } else {
        return [];
      }
    } catch (error) {
      throw error;
    }
  },
};
