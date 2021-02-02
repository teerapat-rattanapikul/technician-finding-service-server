const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    type Query{
        getAllInformation: [USERINFO]
        getInformation: USERINFO
        getUserInfo(userID:ID):USERINFO
    }

    type Mutation{
        insertInformation(INFORMATION:USERINFOINPUT): USERINFO
        updateInformation(INFORMATION:USERINFOINPUT): USERINFO
    }


    type USERINFO{
        firstname: String
        lastname:String
        userID:ID
        avatar:String
        role:String
        phone: String
        technicianInfoID:ID
        chatHistry:[ID]
        forms:[FORM]
    }

    type FORM{
        _id:ID
        senderID:ID
        userInfoID:USERINFO
        detail:String
        image: [String]
        date:String
        techType:String
        location:LOCATIONOUT
        technician:[FORMNOTIC]
    }
    type TIMEOUT{
        hour:Int
        minutes:Int
    }
    type WORKTIMEOUT{
        start:TIMEOUT
        end:TIMEOUT
    }

    type TECHNICIANVALUE{
        aptitude:String
        star:Float
        amountOfvoteStar: Int
        amountOfcomment: Int
        voteID:[ID]
        workDay:[Int]
        workTime:WORKTIMEOUT
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
        acceptForm:[FORM]
        newForm:[FORM]
        star: Float
        amount:Int
        address:AddressOUT
        description: String
        userInfoID: USERINFO
        count: Int
    }
    type AddressOUT{
        lat:Float
        lon:Float
    }
    type FORMNOTIC{
        tech:TECHNICIANINFO
        minPrice:Int
        maxPrice:Int
        location:LOCATIONOUT
    }
    type LOCATIONOUT{
        lat:Float
        lon:Float
    }

    input USERINFOINPUT{
        firstname: String
        lastname:String
        userID:ID
        role: String
    }

    
`);
