const bodyParser = require('body-parser');
const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

var users = {}

io.on("connection", (socket) => {
  console.log(socket.handshake.query)
  
  io.emit(
    "connection",
    (data = {
      msg: `${socket.handshake.query.username} has connected`,
    })
  );


  socket.on("disconnect", () => {
    io.emit("disconnection", `${socket.handshake.query.username} disconnected`);
    delete users[socket.id];
    io.emit('usersChange', users)

    socket.broadcast.emit('user disconnect', {name: socket.handshake.query.username, id: socket.id })
  });

  users[socket.id] = {
    name: socket.handshake.query.username,
    id: socket.id
  }

  io.emit('usersChange', users)

  var newuser = { 
    name: socket.handshake.query.username, 
    id: socket.id,
    msg: ` has connected`
  }

  socket.broadcast.emit('new user', newuser)

  socket.on("message", (data) => {
    var now = new Date();
    const message = {
      name: socket.handshake.query.username,
      text: data.text,
      data: now.toLocaleString(),
    };
    io.emit("message", message);
  });
});


app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/src/pages/index.html");
});

server.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
