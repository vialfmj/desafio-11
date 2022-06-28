const fakerApi = require("../components/faker")
const loginApi = require("../components/login")
const infoApi = require("../components/info")
const randomApi = require("../components/randomNumbers")
module.exports = app => {
    fakerApi(app)
    loginApi(app)
    infoApi(app)
    randomApi(app)
}