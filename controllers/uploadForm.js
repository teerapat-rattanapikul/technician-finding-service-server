const formModel = require("../models").forms;
module.exports = {
  uploadForm: async (req, res, next) => {
    console.log(req.body);
    var form = {};
    try {
      form["detail"] = req.body.detail;
      form["date"] = new Date(req.body.date)
        .toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, "");
      if (req.files !== undefined) {
        var pathFile = [];
        req.files.forEach((element) => {
          pathFile.push(element.path);
        });
        form["image"] = pathFile;
      }
      const information = await formModel.create(form);
      res.json(information);
    } catch (error) {
      res.json(error);
    }
  },
};
