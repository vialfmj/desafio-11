const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {})
const path = require("path")
const session = require("express-session")
const { config,mongo_atlas } = require("./config")

const { mongoose } = require("./database/mongodb")
const { arrayModel, messageModel } = require("./models/messages")
const normalizar = require("../src/utils/normalizr")


//session setup
let {user,pass} = mongo_atlas
const MongoStore = require("connect-mongo")
const advancedOptions = {useNewUrlParser:true, useUnifiedTopology:true }
app.use(session({
    secret: 'palbrasecreta',
    resave: true,
    saveUninitialized:true,
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${user}:${pass}@cluster0.6fibj.mongodb.net/?retryWrites=true&w=majority`,
        mongoOptions: advancedOptions
    }),
    cookie: {
        maxAge: 600000
    }
}))

app.set("views", path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const isAuth = (req,res,next) => {
    if(req.session.user === 'Franco')
    next()
    else
    res.redirect("/login")
}



const serverRoutes = require("./routes")
serverRoutes(app)

app.get("/", isAuth,(req, res, next) => {
    console.log("id ->", req.session.id)
    let tiempo = req.session.cookie.maxAge
    console.log("tiempo ->" , tiempo)
    res.render("index", {user: req.session.user})
})

io.on("connection", async socket => {

    let array = await arrayModel.findById("mensajes").lean()
    if (array){
        const resultado = normalizar(array)
        socket.emit("server:sendList", resultado)
    }
    console.log("newConnection", socket.id)
    socket.on("client:newMessage", async data => {
        let exists = await arrayModel.findById("mensajes")
        if (!exists) {
            let newData = {
                author: data.author,
                text: {
                    content: data.text,
                    _id: 0
                },
                _id: 0
            }
            console.log(newData)
            messages = await arrayModel({ _id: "mensajes" })
            newMessage = await messageModel(newData)
            messages.messages.push(newMessage)
            await messages.save()
            let list = await arrayModel.findById("mensajes").lean()
            let resultado = normalizar(list)
            socket.emit("server:updateList",resultado)

        }
        else {
            let newId = exists.messages.length
            let newData2 = {
                author: data.author,
                text: {
                    content: data.text,
                    _id: newId
                },
                _id: newId
            }
            newMessage = await messageModel(newData2)
            exists.messages.push(newMessage)
            await exists.save({ _id: "mensajes" })
            let list = await arrayModel.findById("mensajes").lean()
            const resultado = normalizar(list)
            socket.emit("server:updateList", resultado)
        }
    })
})
httpServer.listen(config.port)
console.log(`Server on http://localhost:${config.port}`)
