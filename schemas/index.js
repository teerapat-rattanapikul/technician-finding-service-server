const { buildSchema } = require("graphql");
const schema = buildSchema(`
    type Query{
      getAllInformation: [USERINFO]
      getInformation: USERINFO
      uploadImg: String
    }

    type Mutation{
      register(REGISTER:USERNINPUT):USER
      login(LOGIN:USERNINPUT):TOKEN
      insertInformation(INFORMATION:USERINFOINPUT): USERINFO
      updateInformation(INFORMATION:USERINFOINPUT): USERINFO
      insertTechnicianInfo(INFORMATION:TECHNICIANINFOINPUT): TECHNICIANINFO
      updateTechnicianInfo(INFORMATION:TECHNICIANINFOINPUT): TECHNICIANINFO
      sendOTP(phone:String):OTP
      getOTP(AUT:OTPINPUT):OTP
    }

    type USER{
      username: String,
      password: String
    }

    type USERINFO{
      firstname: String
      lastname:String
      address:AddressOUT
      userID:ID
      role:String
      technicianInfoID:[ID]
    }

    type TECHNICIANINFO{
      aptitude: String
      onSite: Boolean
      star: Int
      amountOfvoteStar: Int
      amountOfcomment: Int
      userInfoID: ID
    }

    type OTP{
      code: String
    }

    type TOKEN{
      token:String
    }
    type AddressOUT{
      lat:Float
      lon:Float
    }

    input AddressIN{
      lat:Float
      lon:Float
    }
    input USERNINPUT{
      username: String
      password: String
    } 

    input USERINFOINPUT{
      firstname: String
      lastname:String
      address:AddressIN
      userID:ID
      role: String="user"
    }

    input TECHNICIANINFOINPUT{
      aptitude: String
      onSite: Boolean
      star: Int=0
      amountOfvoteStar: Int=0
      amountOfcomment: Int=0
      userInfoID: ID
    }

    input OTPINPUT{
      code: String
      userInfoID: ID
      phone: String
    }
    
`);

module.exports = schema;
