const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    type Query{
        usernameCheck(username:String):Boolean
        tokenCheck(token:String):TOKEN
       
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
        technicianInfoID:ID
        chatHistry: [ID]
    }
    
    input USERLOGIN{
        username:String
        password:String
    }

    input AddressIN{
        lat:Float
        lon:Float
    }
    
    input UESRREGISTER{
        username: String
        password: String
        firstname: String
        lastname:String
        address:AddressIN
        description: String
        phone:String
        avatar:String
        role: String
        aptitude: String
        onSite: Boolean
        star: Int
        amountOfvoteStar: Int
        amountOfcomment: Int
    }
`);
