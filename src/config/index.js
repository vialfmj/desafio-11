require("dotenv").config()
const yargs = require("yargs/yargs")(process.argv.slice(2)).argv

let config= {
    port: process.env.PORT || yargs.port || 8080,
    mode: process.env.MODE || yargs.mode || 'FORK',
    NODE_ENV: process.env.NODE_ENV || 'development'
}
let mongo_db = {
    uri: process.env.MONGO_DB_URI,
    name: process.env.MONGO_DB_NAME
}
let mongo_atlas = {
    db_user: process.env.MONGO_ATLAS_USER,
    db_pass: process.env.MONGODB_ATLAS_PASS
}
let facebook_config = {
    fb_client_id: process.env.FACEBOOK_CLIENTID,
    fb_client_secret:process.env.FACEBOOK_CLIENTSECRET
}
module.exports = {
    config,
    mongo_db,
    mongo_atlas,
    facebook_config
}