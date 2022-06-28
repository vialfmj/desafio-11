const express = require("express")
const InfoController = require("./controller/infoController")
let Router = express.Router()


module.exports = app => {
    app.use( "/info", Router)
    Router.get("/", InfoController.getInfo)
}