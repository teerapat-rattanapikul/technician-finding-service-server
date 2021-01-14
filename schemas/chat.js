const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    scalar Date
    
    type Query{
        _:Boolean
        getChatInformation(technicianID:ID,userID:ID):CHAT
        getChatRoom(userID:ID):[CHAT]
    }

    type Mutation{
        createChatRoom(INFORMATION:createChatInput):CHAT
        chat(INFORMATION:CHATINPUT):CHAT
    }

    type CHAT{
        _id:ID
        userID:ID,
        userName:String,
        technicianID: ID,
        technicianName:String,
        recentMessage:HISTORY,
        history: [HISTORY],
        status:Boolean
    }

    type HISTORY{
        sender: ID,
        message: String,
        date: Date
    }

    input messageIn{
        sender: ID,
        message: String,
    }

    input createChatInput{
        technicianID: ID,
        message:messageIn
    }

    input CHATINPUT{
        userID:ID,
        technicianID: ID,
        message:messageIn
    }

    

`);
