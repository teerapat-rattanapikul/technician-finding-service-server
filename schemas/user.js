const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    type Query{
        usernameCheck(username:String):Boolean
        tokenCheck:TOKEN
        login(LOGIN:USERLOGIN):TOKEN
        facebookLogin(facebookID:ID):TOKEN
    }

    type Mutation{
        register(REGISTER:USERREGISTER):TOKEN    
    }
    type USER{
        username: String,
        status: Boolean
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
        technician:[FORMNOTIC]
    }
    type TECHNICIANINFO{
        _id : ID
        userID:ID
        aptitude: [TECHNICIANVALUE]
        frontStore:Boolean
        onSite: Boolean
        comment:[COMMENT]
        acceptForm:[FORM]
        newForm:[FORM]
        star: Float
        amount:Int
        address:AddressOUT
        description: String
        bio:String
        userInfoID: USERINFO
        count: Int
        status:Boolean
        workDay:[Int]
        workTime:WORKTIMEOUT
    }
    type FORMNOTIC{
        tech:TECHNICIANINFO
        minPrice:Int
        maxPrice:Int
        location:LOCATIONOUT
    }
    type TOKEN{
        token:String
        username:String
        status:Boolean
        firstname: String
        lastname:String
        avatar:String
        role:String
        userID:ID
        userInfoID:ID
        phone: String
        technicianInfoID:TECHNICIANINFO
        chatHistry: [ID]
        forms:[FORM]
        acceptForms:[FORM]
    }
    
    input USERLOGIN{
        username:String
        password:String
    }

    
    input USERREGISTER{
        username: String
        password: String
        firstname: String
        lastname:String
        phone:String
        avatar:String
        role: String
    }
`);
