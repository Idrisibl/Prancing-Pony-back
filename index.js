require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const logger = require("morgan");


const app = express();

app.use(cors());
app.use(express.json());
app.use(logger(':method :status :url "HTTP/http-version"'));
app.use(require("./routes"));

app.use("/public", express.static(path.resolve(__dirname, "public")));

app.get("/", (req, res) => {
  res.end("Morgan Logger App");
});

mongoose.connect(process.env.MONGODV_SERVER).then(() => {
  console.log(`Server has been started, http://localhost:${process.env.PORT}`)
});

const server = app.listen(process.env.PORT, () =>
console.log(`Server started on ${process.env.PORT}`)
);

const io = require('socket.io')(server, {
  cors: {
      origin: "http://localhost:3000"
  }
})

let activeUsers = []

io.on('connection', (socket) => {
  socket.on('new-user-add', (newUserId) => {
      if (!activeUsers.some((user) => user.userId === newUserId)) {
          activeUsers.push({
              userId: newUserId,
              socketId: socket.id
          })
      }
      console.log("Connected Users", activeUsers);
      io.emit('get-users', activeUsers)
  })

  socket.on("send-message", (data) => {
    console.log(data);
    const {receiverId} = data
    const user = activeUsers.find((user) => user.userId === receiverId)
    if (user) {
      io.to(user.socketId).emit('receive-message', data)
    }
  })

  socket.on('disconnect', ()=>{
      activeUsers = activeUsers.filter((user)=> user.socketId !== socket.id)
      console.log("User Disconected", activeUsers);
      io.emit('get-users', activeUsers)
  })
})
