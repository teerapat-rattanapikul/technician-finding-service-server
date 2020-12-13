const { graphqlHTTP } = require("express-graphql");
const express = require("express");
const app = express();
const { userResolver } = require("./user");
const { userInfoResolver } = require("./userInfo");
const { technicianInfoResolver } = require("./technicianInfo");
const { otpResolver } = require("./otp");
const { formResolver } = require("./form");
const schema = require("../schemas");
const uploadImage = require("./uploadImage");
const jwtVerify = require("../middlewares/verifyJWT");
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
  console.log(file);
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
app.use(
  "/user",
  graphqlHTTP({ schema: schema, rootValue: userResolver, graphiql: true })
);

app.use(
  "/userInfo",
  jwtVerify(),
  graphqlHTTP({
    schema: schema,
    rootValue: userInfoResolver,
    graphiql: true,
  })
);

app.use(
  "/technicianInfo",
  jwtVerify(),
  graphqlHTTP({
    schema: schema,
    rootValue: technicianInfoResolver,
    graphiql: true,
  })
);

// app.use(
//   "/technicianInfo",
//   graphqlHTTP({
//     schema: schema,
//     rootValue: technicianInfoResolver,
//     graphiql: true,
//   })
// );

app.use(
  "/otp",
  graphqlHTTP({ schema: schema, rootValue: otpResolver, graphiql: true })
);

app.use(
  "/form",
  graphqlHTTP({ schema: schema, rootValue: formResolver, graphiql: true })
);

app.use("/uploadImage", uploadImage);

module.exports = app;
