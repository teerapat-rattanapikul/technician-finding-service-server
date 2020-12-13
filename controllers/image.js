const imageModel = require("../models").images;

module.exports = {
  uploadImg: async (req, res, next) => {
    try {
      const IMAGE = await imageModel.create({
        image: req.file.path,
      });
      console.log(IMAGE);
      res.json(IMAGE);
    } catch (error) {
      res.json(error);
    }
  },
};
