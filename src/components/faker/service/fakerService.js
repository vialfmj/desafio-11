const {faker} = require("@faker-js/faker")


class fakerService {
    getProducts = () => {
        let products = []
        for (let index = 0; index < 5; index++) {
            products = [
                ...products,
                {
                    nombre:faker.commerce.product(),
                    precio:faker.commerce.price(100, 500, 0, '$'),
                    foto:faker.image.business(50, 50, true)

                }
            ]
            
        }
        return products
    }
}
module.exports = new fakerService()