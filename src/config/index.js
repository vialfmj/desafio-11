require("dotenv").config()

let config= {
    port: process.env.PORT
}
let mongo_db = {
    uri: process.env.MONGO_DB_URI,
    name: process.env.MONGO_DB_NAME
}
let mongo_atlas = {
    user: process.env.MONGO_ATLAS_USER,
    pass: process.env.MONGODB_ATLAS_PASS
}
module.exports = {
    config,
    mongo_db,
    mongo_atlas
}