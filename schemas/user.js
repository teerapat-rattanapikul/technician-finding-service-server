const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    type Query{
        _:Boolean
        usernameCheck(username:String):Boolean
    }

    type Mutation{
        register(REGISTER:UESRREGISTER):USER    
        login(LOGIN:USERLOGIN):TOKEN
    }

    type USER{
        username: String,
        password: String
        status: Boolean
    }
    type AddressOUT{
        lat:Float
        lon:Float
    }

    type TOKEN{
        token:String
        status:Boolean
        firstname: String
        lastname:String
        role:String
        userID:ID
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
        role: String="user"
        aptitude: String
        onSite: Boolean
        star: Int=0
        amountOfvoteStar: Int=0
        amountOfcomment: Int=0
    }
`);