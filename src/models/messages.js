const {Schema,model} = require("mongoose")

const messageSchema = new Schema({
    author:{
        email: String,
        firstName: String,
        lastName: String,
        age: String,
        alias: String,
        avatar: String,
    },
    text: {
        content:String,
        _id: Number},
    _id:Number
},
{
     versionKey: false 
    })
const arraySchema = new Schema({
    _id: String,
    messages:[messageSchema]
},
{
        versionKey: false 
})
const messageModel = new model("Message", messageSchema)
const arrayModel = new model("Messages", arraySchema)


module.exports = {
    arrayModel,
    messageModel
}