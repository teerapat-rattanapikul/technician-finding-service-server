const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    scalar Date
    
    type Query{
        _:Boolean
    }

    type CHAT{
        user:ID,
        technician: ID,
        history: [HISTORY],
    }
    type HISTORY{
        sender: ID,
        massage: String,
        date: Date
    }

`);
