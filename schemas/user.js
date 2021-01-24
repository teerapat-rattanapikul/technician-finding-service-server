const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    type Query{
        usernameCheck(username:String):Boolean
        tokenCheck:TOKEN
    }

    type Mutation{
        register(REGISTER:UESRREGISTER):TOKEN    
        login(LOGIN:USERLOGIN):TOKEN
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
        workDay:[Int]
        workTime:WORKTIMEOUT
    }
    type LOCATIONOUT{
        lat:Float
        lon:Float
    }
    type FORM{
        _id:ID
        senderID:String
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
    }
    type NOTIFICATION{
        techFname:String
        techLname:String
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
        notification:[NOTIFICATION]
    }
    
    input USERLOGIN{
        username:String
        password:String
    }

    
    input UESRREGISTER{
        username: String
        password: String
        firstname: String
        lastname:String
        phone:String
        avatar:String
        role: String
    }
`);
