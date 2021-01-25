const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    type Query{
        deleteForm(formID:ID):Boolean  
        getForm(formID:ID):FORM
    }

    type Mutation{
        addForm(INFORMATION:FORMINPUT):FORM
        acceptForm(INFORMATION:TECHFORM):Boolean
        
    }
    input TECH{
        _id:ID
        minPrice: Int
        maxPrice: Int
        location:LOCATIONIN
    }
    input TECHFORM{
        formID:ID
        technician:TECH
    }
    type LOCATIONOUT{
        lat:Float
        lon:Float
    }
    type AddressOUT{
        lat:Float
        lon:Float
    }
    type COMMENT{
        userID:ID
        comment:String
    }
    type USERINFO{
        firstname: String
        lastname:String
        userID:ID
        role:String
        phone: String
        technicianInfoID:ID
    }
    type FORMNOTIC{
        tech:TECHNICIANINFO
        minPrice:Int
        maxPrice:Int
        location:LOCATIONOUT
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
    input LOCATIONIN{
        lat:Float
        lon:Float
    }
    input FORMINPUT{
        senderID:ID
        detail:String
        image:[String]
        date:String
        techType:String
        location:LOCATIONIN
    }
`);
