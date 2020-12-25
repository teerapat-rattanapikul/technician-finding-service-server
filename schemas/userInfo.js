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

    type USERINFO{
        firstname: String
        lastname:String
        userID:ID
        role:String
        phone: String
        technicianInfoID:[ID]
    }

    input USERINFOINPUT{
        firstname: String
        lastname:String
        userID:ID
        role: String
    }

    
`);
