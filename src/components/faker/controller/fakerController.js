const faker = require("..")
const fakerService = require("../service/fakerService")

class fakerController  {
    start = async (req,res,next) => {
        let products = fakerService.getProducts()
        res.render("faker", {products})
    }
}

module.exports = new fakerController()