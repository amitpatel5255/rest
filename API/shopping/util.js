const MongoClient = require('mongodb').MongoClient;

const util = {}

util.getDbConnection = (callbackFunction) => {
    MongoClient.connect(process.env.MONGO_URL)
    .then((dbconnection) => {
        callbackFunction(dbconnection.db(process.env.MONGO_DB))
    }).catch((e) => {
        callbackFunction(false)
        console.log(e)
    })
}

module.exports = util