const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000",
    },
})

let users = []

function addNewUser(email, socketId) {

    !users.some((user) => user.email == email) &&
        users.push({email: email, socketId: socketId})
    
}

function removeUser(socketId) {

    users = users.filter((user) => user.socketId!== socketId)
}

function getUser(email) {

    return users.find((user) => user.email === email)

}

io.on("connection", (socket) => {
    console.log("user connected")

    // io.emit("welcome", "hello this is socket server!")

    //add new user 
    socket.on("addUser", userEmail => {

        addNewUser(userEmail, socket.id)
        io.emit("getUsers", users)
    })

    //send message
    socket.on("sendMessage", ({senderEmail, receiverEmail, text, conversationId}) => {

        const receiver = getUser(receiverEmail)

        receiver && 
            io.to(receiver.socketId).emit("getMessage", {
                sender: senderEmail,
                text: text,
                conversationId: conversationId
            })
    })

    //disconnect user
    socket.on("disconnect", () => {
        console.log("user disconnected")
        removeUser(socket.id)
        io.emit("getUsers", users)
    })
})