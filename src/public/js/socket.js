const socket = io()
const {schema, denormalize} = normalizr
 const authorSchema = new schema.Entity("authors",{},{idAttribute:'email'})
const textSchema = new schema.Entity("text",{},{idAttribute: '_id'})
const messageSchema = new schema.Entity("message",{
    author: authorSchema,
    text: textSchema,
},{idAttribute:'_id'})
const messagesSchema = new schema.Entity("messages",{
    messages:[messageSchema]
},{idAttribute: '_id'})


let formData = document.querySelector("#formSignUp")
let formMessage = document.querySelector("#formMessage")
const email = document.querySelector("#email")
const firstName = document.querySelector("#firstName")
const lastName =document.querySelector("#lastName")
const age = document.querySelector("#age")
const alias = document.querySelector("#alias")
const avatar = document.querySelector("#avatar")

const emailMessage = document.querySelector("#email2")
const message = document.querySelector("#message")
formData.addEventListener("submit", e => {
    e.preventDefault()
    socket.emit("client:newMessage", {
        author:{
            email: email.value,
            firstName: firstName.value,
            lastName: lastName.value,
            age: age.value,
            alias: alias.value,
            avatar: avatar.value
        },
        text: message.value
    })
})
socket.on("server:sendList",async (list)=> {
    let listDenormalize = denormalize(list.result, messagesSchema, list.entities)
    let arrayMessages = listDenormalize.messages
    deployMessagesTab(arrayMessages)
})
socket.on("server:updateList",async (list) => {
    let listDenormalize = denormalize(list.result, messagesSchema, list.entities)
    let arrayMessages = listDenormalize.messages
    let lastMessage = arrayMessages.pop()
    updateMessages(lastMessage)
})
updateMessages = (lastMessage)=> {
    let messagesList = document.querySelector("#historyContainer")
    messagesList.append(messageDiv(lastMessage))
}
const deployMessagesTab = (arrayMessages) => {
    let messageContainer = document.querySelector("#historyContainer")
    arrayMessages.forEach(message => {
        messageContainer.append(messageDiv(message))
    });
}
const messageDiv = (message)=> {
    let div = document.createElement('div')
    div.innerHTML = `
        <img class="avatar" src="${message.author.avatar}" alt="">
        <h2>${message.author.alias}:</h2>
        <p>${message.text.content}</p>`
        div.classList.add('container')
        div.classList.add('comment');
    return div
}
