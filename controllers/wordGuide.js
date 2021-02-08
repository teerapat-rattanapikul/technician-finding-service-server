const wordGuideModel = require("../models").words;
module.exports = {
  wordGuide: async (args, req) => {
    try {
      if (req.userID !== null && req.userID !== undefined) {
        // const wordGuide = await wordGuideModel.findOne();
        // const result = wordGuide.word.filter((words) =>
        //   words.includes(args.word)
        // );
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
