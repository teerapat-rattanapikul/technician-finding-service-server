const imageModel = require("../models").images;

const resolver = {
  uploadImg: async (args, req) => {
    try {
      console.log(req.file.path);
      const IMAGE = await image.create({
        img: req.file.path,
      });
      return IMAGE.img;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = { resolver };
