const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    type Query{
        getTechnicianInfo(userID:ID):TECHNICIANINFO
        searchTechnician(word:String):SEARCHOUTPUT
        getNearTechnician(ADDRESS:GETNEAR):SEARCHOUTPUT
        fromSearchTech(word:String,lat:Float,lon:Float,date:String):SEARCHOUTPUT
        saveAcceptForm(formID:ID,userID:ID):Boolean
        saveWaitingForm(formID:ID,userID:ID):Boolean
    }

    type Mutation{
        insertTechnicianInfo(INFORMATION:TECHNICIANINFOINPUT): TECHNICIANINFO
        createTechnicianInfo(INFORMATION:TECHNICIANINFOINPUT): TECHNICIANINFO
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
    type LOCATIONOUT{
        lat:Float
        lon:Float
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
        status:Boolean
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
    input TIMEIN{
        hour:Int
        minutes:Int
    }
    input WORKTIMEIN{
        start:TIMEIN
        end:TIMEIN
    }
    input TECHNICIANINFOINPUT{
        aptitude: [String]
        workTime:WORKTIMEIN
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
