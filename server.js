var http = require('http');
var path = require('path');
var static = require('node-static');
var sio = require('socket.io');

// http server
var app = http.createServer(handler);

var port = process.env.PORT || 1337;

app.listen(port);
console.log("listening on port "+port);

// static webserver
var file = new static.Server('./public');

function handler(req, res) {
  file.serve(req, res);
}

// socket I/O
var io = sio.listen(app);
io.sockets.on('connection', function (socket) {
	console.log("[zipYourZombies] connection established...");
  // handle incoming event
  socket.on('login', function (data) {
    console.log('user pressed a button:', data);
  });
});
