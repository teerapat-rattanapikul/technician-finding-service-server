const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    type Query{
        getOTP(code:String):Boolean
        phoneCheck(phone:String):Boolean
        sendOTP(phone:String):String
    }


`);
