require("dotenv").config()

let config= {
    port: process.env.PORT
}
let mongo_db = {
    uri: process.env.MONGO_DB_URI,
    name: process.env.MONGO_DB_NAME
}
module.exports = {
    config,
    mongo_db
}