const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    type Query{
        getTechnicianInfo(_id:ID):TECHNICIANINFO
    }

    type Mutation{
        insertTechnicianInfo(INFORMATION:TECHNICIANINFOINPUT): TECHNICIANINFO
        updateTechnicianInfo(INFORMATION:TECHNICIANINFOINPUT): TECHNICIANINFO
        searchTeachnician(WORD:SEARCH):SEARCHOUTPUT
    }
    type AddressOUT{
        lat:Float
        lon:Float
    }
    type TECHNICIANINFO{
        aptitude: String
        onSite: Boolean
        star: Int
        address:AddressOUT
        description: String
        amountOfvoteStar: Int
        amountOfcomment: Int
        userInfoID: ID
    }

    type SEARCHOUTPUT{
        technician:[TECHNICIANINFO]
        status:Boolean
    }
      
    input AddressIN{
        lat:Float
        lon:Float
    }
    input TECHNICIANINFOINPUT{
        aptitude: String
        onSite: Boolean
        star: Int=0
        address:AddressIN
        description: String
        amountOfvoteStar: Int=0
        amountOfcomment: Int=0
        userInfoID: ID
    }

    input SEARCH{
        word: String
        address:AddressIN
    }
`);
