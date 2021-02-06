const { graphqlHTTP } = require("express-graphql");
const express = require("express");
const app = express();
const { mergeResolver } = require("../controllers");
const schema = require("../schemas");
const jwtVerify = require("../middlewares/verifyJWT");
const { mergeSchemas } = require("@graphql-tools/merge");

const mergedSchema = mergeSchemas({
  schemas: [
    schema.userSchema,
    schema.userInfoSchema,
    schema.technicianInfoSchema,
    schema.formSchema,
    schema.otpSchema,
    schema.chatSchema,
    schema.wordGuideSchema,
  ],
});

app.use(
  "/graphql",
  jwtVerify(),
  graphqlHTTP({
    schema: mergedSchema,
    rootValue: mergeResolver,
    graphiql: true,
  })
);

module.exports = app;
