const httpLogger = require("../../utils/middlewares/httpLogger")
const logger = require("../../utils/loggers/winston")
module.exports = app => {
    app.get("/login" , (req,res,next) =>{
        try{
        console.log("pid ->", process.pid)
        res.render("login")
        }catch(error){
            logger.error("error en login")
        }
    })
    app.post("/login", async (req,res,next) => {
        let {name} = req.body
        req.session.user = name
        res.redirect("/")
    })
    app.get("/bye", (req,res,next) => {
        res.render("bye", {user: req.user})
    })
    app.get("/logout",async (req,res,next) => {
        req.session.destroy(err => {
            if(!err)
            res.redirect("/")
            else
            res.send("ocurrio un error al desloguear")

        })
    })
}
