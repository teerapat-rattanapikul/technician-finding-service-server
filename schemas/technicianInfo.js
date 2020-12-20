const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    type Query{
        getTechnicianInfo(_id:ID):TECHNICIANINFO
    }

    type Mutation{
        insertTechnicianInfo(INFORMATION:TECHNICIANINFOINPUT): TECHNICIANINFO
        updateTechnicianInfo(INFORMATION:TECHNICIANINFOINPUT): TECHNICIANINFO
        searchTeachnician(WORD:SEARCH):SEARCHOUTPUT
    }

    type TECHNICIANINFO{
        aptitude: String
        onSite: Boolean
        star: Int
        address: String
        amountOfvoteStar: Int
        amountOfcomment: Int
        userInfoID: ID
    }

    type SEARCHOUTPUT{
        technician:[TECHNICIANINFO]
        status:Boolean
    }

    input TECHNICIANINFOINPUT{
        aptitude: String
        onSite: Boolean
        star: Int=0
        amountOfvoteStar: Int=0
        amountOfcomment: Int=0
        userInfoID: ID
    }

    
    input SEARCH{
        word: String
    }
`);
