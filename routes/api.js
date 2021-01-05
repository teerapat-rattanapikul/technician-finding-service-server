const { graphqlHTTP } = require("express-graphql");
const express = require("express");
const uploadImage = require("./uploadImage");
const app = express();
const { mergeResolver } = require("../controllers");
const schema = require("../schemas");
//const jwtVerify = require("../middlewares/verifyJWT");
const { mergeSchemas } = require("@graphql-tools/merge");

const mergedSchema = mergeSchemas({
  schemas: [
    schema.userSchema,
    schema.userInfoSchema,
    schema.technicianInfoSchema,
    schema.fromSchema,
    schema.otpSchema,
    schema.chatSchema,
  ],
});

// app.use(
//   "/graphql",
//   jwtVerify(),
//   graphqlHTTP({
//     schema: mergedSchema,
//     rootValue: mergeResolver,
//     graphiql: true,
//   })
// );

app.use(
  "/graphql",
  graphqlHTTP({
    schema: mergedSchema,
    rootValue: mergeResolver,
    graphiql: true,
  })
);

app.use("/uploadImage", uploadImage);

module.exports = app;
