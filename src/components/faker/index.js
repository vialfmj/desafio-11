const express = require("express")
const fakerController = require("./controller/fakerController")
module.exports = app => {
    let Router = express.Router()
    app.use("/api/productos-test",Router)
    Router.get("/", fakerController.start)
}