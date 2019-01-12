// Author: Tjalling Haije
// Date: 12-01-2019
//
// This Node.js node starts a webserver and serves the index.html file. 
// The user is directly connected through a websocket with the server, 
// which awaits laser and servo commands.


var app = express();
var server = http.Server(app);
var io = socketIO(server);

const util = require('util');
const exec = util.promisify(require('child_process').exec);


app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));


// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});


// Starts the server.
server.listen(5000, function() {
  console.log('Starting server on port 5000');
});

// send motor commands back to server
io.on('connection', function(socket) {
    socket.on('click', function(data) {
        console.log("click, motor commands needed", data.hor, data.vert, " laser:", data.ls);
        exec("python3 ../rpi-control/sendCommand.py " + data.hor + " " + data.vert + " " + data.ls);
    });
});

