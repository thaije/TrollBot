var socket = io();



// socket.on('message', function(data) {
//   console.log(data);
// });


// get percentual x and y position of the mouse click
function getClickCoordinatesPerc(event) {
    var x = event.clientX / window.innerWidth;
    var y = event.clientY /  window.innerHeight;

    // convert relative to center
    x = x - 0.5
    y = y - 0.5

    // round to 2 decimals
    x = Math.round(x * 100) / 100
    y = Math.round(y * 100) / 100

    return [x, y]
}


// percentual motor increase [-100, 100] for horizontal and vertical servo
// horizontal: left = < 0. right = > 0
// vertical: down = < 0, up = > 0
function getMotorCommands(x, y) {

    var hor = x * 200;
    var ver = y * -200;

    return [hor, ver]
}

// on click, calculate where on screen the click was, and convert to servo commands
document.addEventListener("click", function(event){
    console.log("Click! from game.js");

    [x, y] = getClickCoordinatesPerc(event);
    console.log("Percentual x, y relative to center: ", x, y);

    [hor, vert] = getMotorCommands(x,y);
    console.log("Hor:", hor, " vert:", vert);


    socket.emit('click', {"hor": hor, "vert": vert});
});


// socket.emit('new player');
// setInterval(function() {
//   socket.emit('movement', movement);
// }, 1000 / 60);





// var canvas = document.getElementById('canvas');
// canvas.width = 800;
// canvas.height = 600;
// var context = canvas.getContext('2d');
// socket.on('state', function(players) {
//   context.clearRect(0, 0, 800, 600);
//   context.fillStyle = 'green';
//   for (var id in players) {
//     var player = players[id];
//     context.beginPath();
//     context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
//     context.fill();
//   }
// });
