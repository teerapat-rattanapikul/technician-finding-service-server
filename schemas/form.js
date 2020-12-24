const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    type Query{
        deleteForm(INFORMATION:FORMINPUT):Boolean  
    }
    type Mutation{
        addForm(INFORMATION:FORMINPUT):FORM
        
    }

    type FORM{
        title:String
        image: String
    }
 
    input FORMINPUT{
        title:String
        image:String
    }
`);
