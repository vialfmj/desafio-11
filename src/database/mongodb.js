const mongoose = require('mongoose')
const {mongo_db} = require('../config/index')
const MONGO_URI = `${mongo_db.uri}/${mongo_db.name}`

let connection
(async ()=>{
    try {
        connection = await mongoose.connect(MONGO_URI, {useNewUrlParser:true, useUnifiedTopology:true })
        console.log("conexion establecida")
    } catch (error) {
        console.log(error, "error in config/mongoDB.js")
    }

})();

module.exports = {connection, mongoose}