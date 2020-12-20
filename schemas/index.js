const { buildSchema } = require("graphql");
const schema = buildSchema(`
    type Query{
      getAllInformation: [USERINFO]
      getInformation: USERINFO
      getTechnicianInfo(_id:ID):TECHNICIANINFO
    }

    type Mutation{
      register(REGISTER:USERNINPUT):USER
      login(LOGIN:USERNINPUT):TOKEN
      insertInformation(INFORMATION:USERINFOINPUT): USERINFO
      updateInformation(INFORMATION:USERINFOINPUT): USERINFO
      insertTechnicianInfo(INFORMATION:TECHNICIANINFOINPUT): TECHNICIANINFO
      updateTechnicianInfo(INFORMATION:TECHNICIANINFOINPUT): TECHNICIANINFO
      sendOTP(phone:String):OTP
      addForm(INFORMATION:FORMINPUT):FORM
      deleteForm(INFORMATION:FORMINPUT):FORM
      searchTeachnician(WORD:SEARCH):SEARCHOUTPUT

      getOTP(AUT:OTPINPUT):OTP
    }

    type USER{
      username: String,
      password: String
      status: Boolean
    }

    type USERINFO{
      firstname: String
      lastname:String
      address:AddressOUT
      userID:ID
      role:String
      phone: String
      technicianInfoID:[ID]
    }

    type TECHNICIANINFO{
      aptitude: String
      onSite: Boolean
      star: Int
      address: String
      amountOfvoteStar: Int
      amountOfcomment: Int
      userInfoID: ID
    }
    
    type SEARCHOUTPUT{
      technician:[TECHNICIANINFO]
      status:Boolean
    }

    type OTP{
      status:Boolean
    }

    type FORM{
      title:String
      image: String
    }

    type TOKEN{
      token:String
      status:Boolean
      firstname: String
      lastname:String
      role:String
      address:AddressOUT
      userID:ID
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
      firstname: String
      lastname:String
      address:AddressIN
      phone:String
      role: String="user"
      aptitude: String
      onSite: Boolean
      star: Int
      amountOfvoteStar: Int
      amountOfcomment: Int
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
    
    input FORMINPUT{
      title:String
      image:String
    }
    
    input SEARCH{
      word: String
    }
`);

module.exports = schema;
