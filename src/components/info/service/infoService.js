const yargs = require("yargs/yargs")
const procYargs = require("yargs/yargs")(process.argv.slice(2)).argv
const numCpus = require("os").cpus().length


let procYargsKeys = Object.keys(procYargs)
let procYargsValues = Object.values(procYargs)
let argumentos = []
for (let index = 1; index < procYargsKeys.length-1; index++) {
    let key = procYargsKeys[index];
    let value = procYargsValues[index]
    let par = `${key}: ${value}`
    argumentos.push(par)
}
let datos = {
    argumentosDeEntrada: argumentos ,
    nombreDeLaPlataforma: process.plataform,
    versionDeNodeJs: process.version,
    memoriaTotalReservada: `${process.memoryUsage.rss()}bytes`,
    pathDeEjecucion: process.argv[0],
    processId: process.pid,
    carpetaDelProyecto: process.cwd(),
    cantidadDeProcesadores: numCpus
}

class InfoService {
    getInfo = async () => {
        return datos
    }
}
module.exports = new InfoService()