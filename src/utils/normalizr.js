const { schema, normalize, denormalize } = require("normalizr")
const inspect = require("./inspect")
//const messagesController = require("../components/messages/controller/messagesController")

const normalizar = (messages) => {
    const authorSchema = new schema.Entity("authors",{},{idAttribute:'email'})
    const textSchema = new schema.Entity("text",{},{idAttribute: '_id'})
    const messageSchema = new schema.Entity("message",{
        author: authorSchema,
        text: textSchema,
    },{idAttribute:'_id'})
    const messagesSchema = new schema.Entity("messages",{
        messages:[messageSchema]
    },{idAttribute: '_id'})
    const resultado_normalizado = normalize(messages, messagesSchema)
    console.log("sin normalizar: ", JSON.stringify(messages).length)
    console.log("normalizado: ", JSON.stringify(resultado_normalizado).length)

    const resultadoDesnormalizado = denormalize(resultado_normalizado.result ,messagesSchema, resultado_normalizado.entities)
    console.log("objeto desnormalizado ->", JSON.stringify(resultadoDesnormalizado).length)
    return resultado_normalizado 
}
//normalizar(mensajes);
module.exports = normalizar