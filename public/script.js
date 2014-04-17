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

  socket.on('player', function(user) {
    console.log(user);
  });

  var form = document.querySelector("form");
  form.onsubmit = login;

  requestAnimationFrame(animate);
}

function animate() {
}

function login() {
  username = document.querySelector("input[name=naam]").value;
  socket.emit('login', username);
  document.querySelector("form").style.display = "none";
  return false;
}

function setSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  width = canvas.width;
  height = canvas.height;
}