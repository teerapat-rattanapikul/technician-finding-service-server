const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    type Query{
        deleteForm(formID:ID):Boolean  
        getForm(formID:ID):FORM
    }

    type Mutation{
        addForm(INFORMATION:FORMINPUT):FORM
        
    }
    type LOCATIONOUT{
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
    input LOCATIONIN{
        lat:Float
        lon:Float
    }
    input FORMINPUT{
        detail:String
        image:[String]
        date:String
        techType:String
        location:LOCATIONIN
    }
`);
