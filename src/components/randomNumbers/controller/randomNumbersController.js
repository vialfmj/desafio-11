//const randomNumbersService = require("../service/randomNumbersService")
const fork = require("child_process").fork
const forked = fork("randoms.js")

class randomNumbersController {
    getNumbers = async (req, res, next) => {
        console.log("pid:  ->", process.pid )
        try{
            let cantToCalculate = 100000000
            let { cant } = req.query
            if (cant)
                cantToCalculate = cant
            let obj
            forked.send({
                msg: "empezar",
                cant: cantToCalculate
            })
            forked.on("message", async response => {
                try {
                    res.json(response.obj)
                } catch (error) {
                    console.log(error)
                }
            }
            )
        }catch(error){
            throw error
        }
    }
}

module.exports = new randomNumbersController()