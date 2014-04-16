window.onload = init;

var canvas;
var c;
var width;
var height;

var username = null;
var socket;

function init() {
  // create canvas
  canvas = document.createElement("canvas");
  canvas.width = "100%";
  canvas.height = "100%";
  document.body.appendChild(canvas);

  setSize();
  window.onresize = setSize;

  c = canvas.getContext('2d');
  c.font = "14pt Arial";
  c.textAlign = "right";

  socket = io.connect();

  socket.on('newuser', function(data) {
    console.log(data);
  });

  var button = document.querySelector("#login");
  button.onclick = login;
}

function login() {
  username = document.querySelector("input[name=naam]").value;
  socket.emit('login', username);
}

function setSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  width = canvas.width;
  height = canvas.height;
}