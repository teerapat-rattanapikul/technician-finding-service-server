const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    scalar Date
    
    type Query{
        _:Boolean
        getChatInformation(technicianID:ID,userID:ID):CHAT
        getChatRoom(userID:ID):[CHAT]
        getChatInformationByID(chatID:ID):CHAT
    }

    type Mutation{
        createChatRoom(INFORMATION:createChatInput):CHAT
        chat(INFORMATION:CHATINPUT):CHAT
    }

    type CHAT{
        _id:ID
        userID:ID,
        userAvatar:String,
        userName:String,
        technicianID: ID,
        technicianAvatar:String
        technicianName:String,
        recentMessage:HISTORY,
        history: [HISTORY],
        status:Boolean
    }

    type HISTORY{
        sender: ID,
        message: String,
        date: Date
        msgType: String,
    }

    input messageIn{
        sender:ID,
        message: String,
        msgType: String,
    }

    input createChatInput{
        technicianID: ID,
        message:messageIn
    }

    input CHATINPUT{
        technicianID: ID,
        message:messageIn
    }

    

`);
