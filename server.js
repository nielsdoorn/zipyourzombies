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

io.configure(function () { 
	io.set('log level', 1);
});

var players = [];

setInterval(broadcastPlayers, 100);

io.sockets.on('connection', function (socket) {
	console.log("[zipYourZombies] connection established...");
  // handle incoming event
  socket.on('login', function (username) {
    console.log('user logged in:', username);
    var newPlayer = {
    	'username': username,
    	'x': 20,
    	'y': 200,
    	'health': 100,
    	'score': 0
    }
    players.push(newPlayer);
    socket.broadcast.emit('newuser', newPlayer);
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

function broadcastPlayers() {
	for (var i = 0; i < players.length; i++) {
		var p = players[i];
		io.sockets.emit('player', p);
	};
}


