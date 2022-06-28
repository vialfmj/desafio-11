const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {})
const path = require("path")
const session = require("express-session")
const { config,mongo_atlas } = require("./config")

const {mongoose} = require("../src/database/mongodb")
const { arrayModel, messageModel } = require("./models/messages")
const fbUserModel = require("./models/user")
const normalizar = require("../src/utils/normalizr")

//session setup

let {db_user,db_pass} = mongo_atlas
const MongoStore = require("connect-mongo")
const advancedOptions = {useNewUrlParser:true, useUnifiedTopology:true }
app.use(session({
    secret: 'palbrasecreta',
    resave: true,
    saveUninitialized:true,
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${db_user}:${db_pass}@cluster0.6fibj.mongodb.net/?retryWrites=true&w=majority`,
        mongoOptions: advancedOptions
    }),
    cookie: {
        maxAge: 600000
    }
}))
/* app.use(session({
    secret: 'palbrasecreta',
    resave: true,
    saveUninitialized:true,
    cookie: {
        maxAge: 600000
    }
})) */


//passport
const passport = require("passport")
app.use(passport.initialize());
app.use(passport.session());
const FacebookStrategy = require("passport-facebook").Strategy;

passport.use(new FacebookStrategy({
    clientID: "738603320716203",
    clientSecret: "a782aac00a8206062c0f776b5aa2e6d2",
    callbackURL: "/auth/facebook/callback/",
    profileFields:['id', 'displayName' , 'photos', 'email']
    
},
//http://localhost:3002/auth/facebook/callback&client_id=441659857463627
    async (accessToken, refreshToken,profile, done) => {
        console.log("profile ->",profile)
        let user = {
            name: profile.displayName,
            _id: profile.id,
            email: profile.email,
            photo: profile.photos[0].value
        }
        let fbUser = await fbUserModel.findOne({id: profile.id})
        if(fbUser)
            done(null, fbUser)
        else{
            console.log("creando un nuevo usuario...")
            newUser = await fbUserModel(user)
            await newUser.save()
            done(null,user)
        }

    }
))




app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {successRedirect: '/', failureRedirect: '/login' }))




app.set("views", path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const isAuth = (req,res,next) => {
    if(req.isAuthenticated()){
        console.log("isAuth->", req.user)
        next()
    }
    else
    res.redirect("/login")
}

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
});


const serverRoutes = require("./routes")
serverRoutes(app)

app.get("/",isAuth, (req, res, next) => {
    console.log("req ->", req.user)
    res.render("index", {user: req.user} )
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
