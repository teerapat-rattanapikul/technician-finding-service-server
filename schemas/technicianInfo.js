const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    type Query{
        getTechnicianInfo(userID:ID):TECHNICIANINFO
        searchTechnician(word:String):SEARCHOUTPUT
        getNearTechnician(ADDRESS:GETNEAR):SEARCHOUTPUT
    }

    type Mutation{
        insertTechnicianInfo(INFORMATION:TECHNICIANINFOINPUT): TECHNICIANINFO
        updateTechnicianInfo(INFORMATION:TECHNICIANUPDATE): TECHNICIANINFO  
        userVote(userID:ID,aptitude:String,voteStar:Int):TECHNICIANINFO
        userComment(userID:ID,comment:String):TECHNICIANINFO
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
        technicianInfoID:ID
    }
    type COMMENT{
        userID:ID
        comment:String
    }
    type TECHNICIANINFO{
        _id : ID
        userID:ID
        aptitude: [TECHNICIANVALUE]
        onSite: Boolean
        comment:[COMMENT]
        star: Float
        amount:Int
        address:AddressOUT
        description: String
        userInfoID: USERINFO
        count: Int
        status:Boolean
    }

    type TECHNICIANVALUE{
        aptitude:String
        star:Float
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
    input CommentIN{
        userID:ID
        comment:String
    }
    input TECHNICIANINFOINPUT{
        aptitude: String!
        onSite: Boolean!
        address:AddressIN
        description: String
    }
    input TECHNICIANUPDATE{
        technicianID:ID!
        onSite: Boolean!
        description: String
        address:AddressIN
    }

    input GETNEAR{
        address:AddressIN!
    }
`);
