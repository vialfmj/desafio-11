//const randomNumbersService = require("../service/randomNumbersService")
const {fork} = require("child_process")
const forked = fork("randoms.js")

class randomNumbersController {
    getNumbers = async (req, res, next) => {
        let cantToCalculate = 100000000
        let {cant} = req.query
        if(cant)
        cantToCalculate = cant
        let obj
        forked.send({
            msg: "empezar",
            cant: cantToCalculate
        })
        forked.on("message", async response => {
            obj = response.obj
            res.json(obj)
        }
        )
/*         let response  = await randomNumbersService.getNumbers()
        console.log(response) */
    }
}

module.exports = new randomNumbersController()