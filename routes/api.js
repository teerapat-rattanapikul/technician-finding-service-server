const { graphqlHTTP } = require("express-graphql");
const express = require("express");
const uploadImage = require("./uploadImage");
const app = express();
const resolver = require("../controllers");
const schema = require("../schemas");
const jwtVerify = require("../middlewares/verifyJWT");

app.use(
  "/user",
  graphqlHTTP({
    schema: schema.userSchema,
    rootValue: resolver.userResolver,
    graphiql: true,
  })
);

app.use(
  "/userInfo",
  jwtVerify(),
  graphqlHTTP({
    schema: schema.userInfoSchema,
    rootValue: resolver.userInfoResolver,
    graphiql: true,
  })
);

app.use(
  "/technicianInfo",
  jwtVerify(),
  graphqlHTTP({
    schema: schema.technicianInfoSchema,
    rootValue: resolver.technicianInfoResolver,
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
  graphqlHTTP({
    schema: schema.otpSchema,
    rootValue: resolver.otpResolver,
    graphiql: true,
  })
);

app.use(
  "/form",
  graphqlHTTP({
    schema: schema.fromSchema,
    rootValue: resolver.formResolver,
    graphiql: true,
  })
);

app.use("/uploadImage", uploadImage);

module.exports = app;
