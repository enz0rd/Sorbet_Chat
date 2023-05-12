var data = new Date();
var socket = io();

var messages = document.getElementById("messages");
var form = document.getElementById("form");
var input = document.getElementById("input");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    var data = {
      name: socket.name,
      text: input.value,
    };
    socket.emit("message", data);
    input.value = "";
  }
});
socket.on("message", function (message) {
  const listItem = document.createElement("ul");
  listItem.innerHTML = `<div class="umessage">
                                        <ul class="name">${message.name}</ul>
                                        <ul class="text">${message.text}</ul>
                                        <ul class="data">${data.toLocaleString()}</ul>
                                    </div>`;
  messages.appendChild(listItem);
  document
    .getElementById("chat")
    .scrollTo(document.getElementById("chat").scrollIntoView());
});

socket.on("connection", function (data) {
  var item = document.createElement("ul");
  var user = document.getElementById("username");
  user.textContent = `${data.name}`;
  item.textContent = data.msg;
  messages.appendChild(item);
  document
    .getElementById("chat")
    .scrollTo(document.getElementById("chat").scrollIntoView());
});
socket.on("disconnection", function (msg) {
  var item = document.createElement("ul");
  item.textContent = msg;
  messages.appendChild(item);
  document
    .getElementById("chat")
    .scrollTo(document.getElementById("chat").scrollIntoView());
});

// Get the necessary elements
const chat = document.querySelector(".chat");
const formclass = document.querySelector(".form");
const messagesclass = document.querySelector(".messages");
const sidebar = document.querySelector(".sidebar");
const toggleButton = document.querySelector(".hide");
const toggleoffButton = document.getElementById("hide");

// Add a click event listener to the toggle button
toggleButton.addEventListener("click", function () {
  toggleoffButton.classList.toggle("open");
  sidebar.classList.toggle("open");
  chat.classList.toggle("open");
  formclass.classList.toggle("open");
  messagesclass.classList.toggle("open");
});

// Add a click event listener to the toggle button
toggleoffButton.addEventListener("click", function () {
  toggleoffButton.classList.toggle("open");
  sidebar.classList.toggle("open");
  chat.classList.toggle("open");
  formclass.classList.toggle("open");
  messagesclass.classList.toggle("open");
});
