const wordGuideModel = require("../models").words;
module.exports = {
  wordGuide: async (args, req) => {
    try {
      const findWord = await wordGuideModel.find({
        word: { $regex: args.word, $options: "i" },
      });
      const result = findWord.map((data) => data.word);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
