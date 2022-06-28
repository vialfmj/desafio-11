const randomNumbersController = require("./controller/randomNumbersController")

module.exports = app => {
    app.get("/api/randoms", randomNumbersController.getNumbers)
}