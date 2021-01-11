const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    type Query{
        deleteForm(INFORMATION:FORMINPUT):Boolean  
        getForm(formID:ID):FORM
    }

    type Mutation{
        addForm(INFORMATION:FORMINPUT):FORM
        
    }

    type FORM{
        _id:ID
        senderID:String
        detail:String
        image: String
        date:String
    }
 
    input FORMINPUT{
        detail:String
        image:[String]
        date:String
    }
`);
