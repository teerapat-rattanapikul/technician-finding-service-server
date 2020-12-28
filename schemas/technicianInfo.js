const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    type Query{
        getTechnicianInfo(_id:ID):TECHNICIANINFO
    }

    type Mutation{
        insertTechnicianInfo(INFORMATION:TECHNICIANINFOINPUT): TECHNICIANINFO
        updateTechnicianInfo(INFORMATION:TECHNICIANUPDATE): TECHNICIANINFO
        searchTechnician(WORD:SEARCH):SEARCHOUTPUT
        getNearTechnician(ADDRESS:GETNEAR):SEARCHOUTPUT
    }
    type AddressOUT{
        lat:Float
        lon:Float
    }
    type USERINFO{
        firstname: String
        lastname:String
        userID:ID
        role:String
        phone: String
        technicianInfoID:[ID]
    }

    type TECHNICIANINFO{
        aptitude: [TECHNICIANVALUE]
        onSite: Boolean
        star: Int
        amount:Int
        address:AddressOUT
        description: String
        userInfoID: USERINFO
        count: Int
    }

    type TECHNICIANVALUE{
        aptitude:String
        star:Int
        amountOfvoteStar: Int
        amountOfcomment: Int
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
        address:AddressIN
        description: String
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
