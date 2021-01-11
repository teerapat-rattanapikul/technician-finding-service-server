var router = require("express").Router();
const formController = require("../controllers").formController;
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5, // 5 mb
  },
  fileFilter: fileFilter,
});
// max number of image is 5
router.use("/", upload.array("formImage", 5), formController.uploadForm);

module.exports = router;
