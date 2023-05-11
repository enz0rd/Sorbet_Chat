const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/pages/index.html");
});

const names = [
  'John',
'Emma',
'Noah',
'Olivia',
'Liam',
'Ava',
'William',
'Sophia',
'Mason',
'Isabella',
'James',
'Mia',
'Benjamin',
'Charlotte',
'Jacob',
'Amelia',
'Michael',
'Harper',
'Ethan',
'Evelyn',
'Daniel',
'Abigail',
'Matthew',
'Emily',
'Aiden',
'Elizabeth',
'Henry',
'Avery',
'Joseph',
'Ella',
'Samuel',
'Sofia',
'David',
'Madison',
'Jackson',
'Scarlett',
'Logan',
'Victoria',
'Anthony',
'Aria',
'Christopher',
'Grace',
'Gabriel',
'Chloe',
'Andrew',
'Camila',
'Lucas',
'Penelope',
'Joshua',
'Riley',
'Nicholas',
'Luna',
'Nathan',
'Layla',
'Ryan',
'Ellie',
'Elijah',
'Aurora',
'Christian',
'Nora',
'Isaac',
'Zoe',
'Owen',
'Hannah',
'Caleb',
'Lily',
'Landon',
'Addison',
'Jonathan',
'Aaliyah',
'Cameron',
'Stella',
'Charles',
'Natalie',
'Isabella',
'Zoey',
'Henry',
'Leah',
'Josiah',
'Hazel',
'Isaiah',
'Violet',
'Ezra',
'Aubrey',
'Angel',
'Audrey',
'Adam',
'Ayden',
'Arianna',
'Aidan',
'Lucy',
'Adrian',
'Bella',
'Alex',
'Brooklyn',
'Alejandro',
'Claire',
'Alexis',
'Savannah',
'Alice',
'Sophie'
];

randomint = () => {
  var NUMERO =  Math.random().toString(8).substring(8, 10);
  while (NUMERO == 0) {
      NUMERO =  Math.random().toString(8).substring(8, 10);
    }
    if (NUMERO.charAt(0) === '0') {
      NUMERO = NUMERO.replace('0', '');
    }
    console.log(NUMERO);
    return NUMERO;
  }

io.on("connection", (socket) => {
  const name = `${names[randomint()]}#${Math.random()
    .toString(8)
    .substring(2, 6)}`;
  socket.name = name;
  io.emit("connection", data = {
    name: name,
    msg: `${socket.name} has connected`
  });
  socket.on("disconnect", () => {
    io.emit("disconnection", `${socket.name} disconnected`);
  });
  socket.on("message", (data) => {
    const message = {
      name: socket.name,
      text: data.text,
    };
    io.emit("message", message);
  });
});

server.listen(3000, () => {
  console.log("listening on localhost:3000");
});
