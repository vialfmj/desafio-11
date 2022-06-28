const InfoService = require("../service/infoService")

class InfoController {
    getInfo = async (req, res, next) => {
        let datos = await  InfoService.getInfo()
        res.render("info", {datos:datos})
    }
}

module.exports = new InfoController()