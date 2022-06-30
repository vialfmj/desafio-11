const winston = require("winston")
const {NODE_ENV} = require("../../config").config


let formatLog = NODE_ENV === 'development' ? 'Console' : 'File'
let objWinston = NODE_ENV === 'development' ? {level: 'verbose'} : {
    fileName: 'winston.log', level: 'warn'
}
let logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({level: 'verbose'}),
        new winston.transports.File({filename: 'warn.log', level: 'warn'}),
        new winston.transports.File({filename: 'error.log', level: 'error'})
    ]
})

module.exports = logger