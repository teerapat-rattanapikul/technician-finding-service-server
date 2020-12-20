const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    type Query{
        getAllInformation: [USERINFO]
        getInformation: USERINFO
    }

    type Mutation{
        insertInformation(INFORMATION:USERINFOINPUT): USERINFO
        updateInformation(INFORMATION:USERINFOINPUT): USERINFO
    }
    type AddressOUT{
        lat:Float
        lon:Float
    }

    type USERINFO{
        firstname: String
        lastname:String
        address:AddressOUT
        userID:ID
        role:String
        phone: String
        technicianInfoID:[ID]
    }
  
    input AddressIN{
        lat:Float
        lon:Float
    }

    input USERINFOINPUT{
        firstname: String
        lastname:String
        address:AddressIN
        userID:ID
        role: String="user"
    }

    
`);
