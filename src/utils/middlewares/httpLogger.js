const logger = require("../loggers/winston")

const httpErrorLogger = (req,res,next) => {
    logger.warn(`request: ${req.method}: ${req.url}`)
    next()
}

const httpLogger = (req,res,next) => {
    logger.info(`request: ${req.method}: ${req.originalUrl}`)
    next()
}

module.exports = {
    httpLogger,
    httpErrorLogger
}