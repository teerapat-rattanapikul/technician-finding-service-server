// const imageModel = require("../models").images;

module.exports = {
  uploadImg: async (req, res, next) => {
    try {
      console.log(req.file.path);
      res.json(req.file.path);
    } catch (error) {
      throw error;
    }
  },
};
