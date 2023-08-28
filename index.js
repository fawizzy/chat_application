const express = require("express")
const chatController = require("./controllers/chatController")
const indexRoute = require("./route/indexRoute")
const userRoute = require("./route/userRoute")
const httpServer= require("http")
const { Server } = require("socket.io")
const cookieParser = require("cookie-parser")
const uuidv4 = require("uuid").v4
const redisClient = require("./db/redis")
const userController = require("./controllers/userController")

let clients_id = []


const app = express()



app.use(express.static(__dirname + "/public"))
app.use(express.json())
app.use(cookieParser())
app.use(userRoute)
app.use(indexRoute)
const port = 5000;
const httpserver =  httpServer.createServer(app)

const io = new Server(httpserver)

io.on('connection',async (socket) => {
    
    let token = socket.handshake.auth.token
    let key = `auth_${token}`
    let user = await userController.getUser(key)
    user = JSON.parse(user)
    if (!user){
        return
    }
    socket.user_id = user._id
    console.log(user.username + " is online")
    if (!clients_id.includes(user._id)){
        clients_id.push(user._id)
    }
    io.sockets.emit("user_connected", clients_id)

    //io.to(getIdbyUserId(socket,user._id)).emit("cursor", "just for you m")
    let clients = io.of("/").sockets

    socket.on("private_message", ({from, to, content})=>{
        console.log(to)
        io.to(getIdbyUserId(clients,to)).emit("private_message", {from: socket.user_id, content: content})
    })

    

    socket.on("disconnect",async (reason) => {
        console.log(reason)
        token = socket.handshake.auth.token
        key = `auth_${token}`
        user = await userController.getUser(key)
        user = JSON.parse(user)
        console.log(user.username + " is offline")
      });

  });
 
  

httpserver.listen(port,"0.0.0.0", ()=>{
    console.log(`listening at port ${port}`)
})

function getIdbyUserId(clients, user_id){
    for (let s of clients){
        if (s[1].user_id === user_id){ 
            return s[1].id
        }
    }
    
    return null;
}
