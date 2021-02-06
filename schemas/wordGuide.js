const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    type Query{
        wordGuide(word:String):[String]
    }



`);
