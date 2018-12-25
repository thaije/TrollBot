var socket = io();



// go Fullscreen button
// var goFS = document.getElementById("goFS");
// goFS.addEventListener("click", function() {
//     console.log("Button click")
//     document.body.requestFullscreen();
//     document.body.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
//     document.body.mozRequestFullScreen();
//     document.body.msRequestFullscreen();
//     document.body.requestFullscreen(); // standard
// }, false);




// resize after a slight delay, because of having to reset the width etc. of
// previous js shizzel
window.onload = fixStreamSizeDelayed;
function fixStreamSizeDelayed() {
    setTimeout(function(){
        fixStreamSize();
    }, 500);
}

// fit the stream as well as possible to the window
window.addEventListener("resize", fixStreamSize);
function fixStreamSize() {
    // get elements
    var canvas = document.getElementById('video-canvas');
    var bgLeft = document.getElementById('bg-left');
    var bgRight = document.getElementById('bg-right');
    var filler = document.getElementById('filler');

    // var aspectRatio = 1920 / 1080 // 1.7778:1
    var aspectRatio = 640 / 480; // 1.33:1

    // by default we sit width to 100%, but check if this is also allright with
    // the height (no overflow)
    if ((window.innerWidth / aspectRatio) > window.innerHeight) {
        console.log("Resizing, height max");
        canvas.style.width = 'auto';
        canvas.style.height = '100%';

        // Size of gap on sides
        var gapOnSides = Math.round((window.innerWidth - canvas.clientWidth) / 2);

        // scale side pussies
        bgLeft.style.height = canvas.clientHeight + "px";
        bgLeft.style.width = gapOnSides + "px";
        bgRight.style.height = canvas.clientHeight + "px";
        bgRight.style.width = gapOnSides + "px";

    } else {
        console.log("Resizing, width max");

        // hide side pussies
        bgLeft.style.width = "0px";
        bgRight.style.width = "0px";

        // scale stream
        canvas.style.width = '100%';
        canvas.style.height = 'auto';
    }

    // fix filler height
    var w = Math.round(window.innerHeight - canvas.clientHeight);
    filler.style.height = w + "px";

    console.log("Filler height set to:", w);

}


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




// socket.on('message', function(data) {
//   console.log(data);
// });


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
