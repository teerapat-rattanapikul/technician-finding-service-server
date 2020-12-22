const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    type Query{
        _:Boolean
        getOTP(code:String):Boolean
        phoneCheck(phone:String):Boolean
        sendOTP(phone:String):String
    }


`);
