const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    type Query{
        getTechnicianInfo(_id:ID):TECHNICIANINFO
    }

    type Mutation{
        insertTechnicianInfo(INFORMATION:TECHNICIANINFOINPUT): TECHNICIANINFO
        updateTechnicianInfo(INFORMATION:TECHNICIANUPDATE): TECHNICIANINFO
        searchTeachnician(WORD:SEARCH):SEARCHOUTPUT
        getNearTeachnician(ADDRESS:GETNEAR):SEARCHOUTPUT
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
        count: Int
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
        aptitude: String!
        onSite: Boolean!
        star: Int
        address:AddressIN
        description: String
        amountOfvoteStar: Int
        amountOfcomment: Int
        userInfoID: ID
    }
    input TECHNICIANUPDATE{
        technicianID:ID!
        onSite: Boolean!
        description: String
        address:AddressIN
    }

    input SEARCH{
        word: String!
        address:AddressIN!
    }

    input GETNEAR{
        address:AddressIN!
    }
`);
