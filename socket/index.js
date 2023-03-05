const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000",
    },
})

let users = []

function addNewUser(email, socketId) {

    !users.some((user) => user.email === email) &&
        users.push({email: email, socketId: socketId})
    
}

function removeUser(socketId) {

    users = users.filter((user) => user.socketId !== socketId)
}

function getUser(receivers, sender) {

    let result = []

    users.forEach((user) => {

        receivers.forEach((receiver) => {

            if(user.email === receiver.email && user.email !== sender){
                result.push({email: user.email, socketId: user.socketId})
            }
        }) 
    })

    return result

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
    socket.on("sendMessage", ({senderEmail, receivers, name, text, conversationId, isImage, fileUrl}) => {

        const receiver_sockets = getUser(receivers, senderEmail)
        // console.log(users, receiverEmail, receiver, senderEmail, text, conversationId)

        if(receiver_sockets.length > 0){

            for(let i=0; i<receiver_sockets.length; i++){

                let rec = receiver_sockets[i]
                io.to(rec.socketId).emit("getMessage", {
                    isImage: isImage,
                    fileUrl: fileUrl,
                    sender: senderEmail,
                    text: text,
                    conversationId: conversationId,
                    name: name
                })

            }
        }
    })

    //disconnect user
    socket.on("disconnect", () => {
        console.log("user disconnected")
        removeUser(socket.id)
        io.emit("getUsers", users)
    })
})