const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    type Query{
        _:Boolean
        getOTP(code:String):Boolean
    }

    type Mutation{
        sendOTP(phone:String):codeOTP
    }

    type codeOTP{
        code: String
        status: Boolean
    }

`);
