// const imageModel = require("../models").images;

module.exports = {
  uploadImg: async (req, res, next) => {
    try {
      // const IMAGE = await imageModel.create({
      //   image: req.file.path,
      // });
      res.json(req.file.path);
    } catch (error) {
      throw error;
    }
  },
};
