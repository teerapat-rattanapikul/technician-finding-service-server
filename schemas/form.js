const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    type Query{
        deleteForm(INFORMATION:FORMINPUT):Boolean  
        getForm(formID:ID):FORM
    }

    type Mutation{
        addForm(INFORMATION:FORMINPUT):FORM
        
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
