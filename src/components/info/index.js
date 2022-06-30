const express = require("express")
const InfoController = require("./controller/infoController")
let Router = express.Router()
const gzip = require("compression")
const {httpLogger} = require("../../utils/middlewares/httpLogger")


module.exports = app => {
    app.use( "/info", Router)
    Router.get("/",httpLogger , gzip() , InfoController.getInfo)
}