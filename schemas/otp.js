const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    type Query{
        _:Boolean
    }
    type Mutation{
        sendOTP(phone:String):OTP
        getOTP(AUT:OTPINPUT):OTP
    }

    type OTP{
        status:Boolean
    }

    input OTPINPUT{
        code: String
        userInfoID: ID
        phone: String
    }
`);
