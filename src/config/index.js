require("dotenv").config()
const yargs = require("yargs/yargs")(process.argv.slice(2)).argv


let config= {
    port: yargs.port || 8080
}
let mongo_db = {
    uri: process.env.MONGO_DB_URI,
    name: process.env.MONGO_DB_NAME
}
let mongo_atlas = {
    db_user: process.env.MONGO_ATLAS_USER,
    db_pass: process.env.MONGODB_ATLAS_PASS
}
module.exports = {
    config,
    mongo_db,
    mongo_atlas
}