const {Schema, model} = require("mongoose")

const fbUserSchema = new Schema ({
    name: String,
    email: String,
    photo: String,
    _id : String
},{
     versionKey: false 
})
const fbUserModel = new model("FbUser",fbUserSchema)

module.exports = fbUserModel