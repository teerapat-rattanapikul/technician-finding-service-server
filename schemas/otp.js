const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    type Query{
        _:Boolean
        sendOTP(phone:String):Boolean
        getOTP(code:String):Boolean
    }

`);
