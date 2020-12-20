const formModel = require("../models").forms;
const imageModel = require("../models").images;
const fs = require("fs");

module.exports = {
  addForm: async ({ INFORMATION }) => {
    try {
      INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
      console.log(INFORMATION);
      const information = await formModel.create(INFORMATION);
      console.log(information);
      return information;
    } catch (error) {
      throw error;
    }
  },
  deleteForm: async ({ INFORMATION }) => {
    try {
      INFORMATION = JSON.parse(JSON.stringify(INFORMATION));
      await formModel.deleteOne({
        title: INFORMATION.title,
        image: INFORMATION.image,
      });
      await imageModel.deleteOne({ img: INFORMATION.image });
      fs.unlinkSync(INFORMATION.image);
      return { title: "delete", image: "delete" };
    } catch (error) {}
  },
};
