const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    scalar Date
    
    type Query{
        _:Boolean
        getChatInformation(chatID:ID,userID:ID):CHAT
    }

    type Mutation{
        createChatRoom(INFORMATION:createChatInput):CHAT
    }

    type CHAT{
        userID:ID,
        userName:String,
        technicianID: ID,
        technicianName:String,
        recentMassage:HISTORY,
        history: [HISTORY],
        status:Boolean
    }

    type HISTORY{
        sender: ID,
        massage: String,
        date: Date
    }

    input massageIn{
        sender: ID,
        massage: String,
    }

    input createChatInput{
        userID:ID,
        userName:String,
        technicianID: ID,
        technicianName:String,
        massage:massageIn
    }

    

`);
