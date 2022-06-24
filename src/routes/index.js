const fakerApi = require("../components/faker")
const loginApi = require("../components/login")
module.exports = app => {
    fakerApi(app)
    loginApi(app)
}