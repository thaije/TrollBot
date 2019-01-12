// Author: Tjalling Haije
// Date: 12-01-2019
//
// This JS file holds all the JS logic for the webapp. 
// It calculates the servo commands based on clicks/tabs, sends this 
// info back to the main server over the websocket, and resizes the window when the user 
// rotates their screen.
 


var socket = io();


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

    var target = event.target || event.srcElement;
    console.log("Click target:", target.id);

    // Toggle laser
    if (target.id == "laserToggle") {

        // switch it on
        if (target.className == "laserOff") {
            target.className = "laserOn";
            socket.emit('click', {"hor": 0, "vert": 0, "ls": 1});
            console.log("toggle on");
        }
        // switch it off
        else {
            console.log("toggle off");
            target.className = "laserOff";
            socket.emit('click', {"hor": 0, "vert": 0, "ls": -1});
        }

        // make sure we skip the normal click behaviour
        return
    }

    console.log("Click! from game.js");

    [x, y] = getClickCoordinatesPerc(event);
    console.log("Percentual x, y relative to center: ", x, y);

    [hor, vert] = getMotorCommands(x,y);
    console.log("Hor:", hor, " vert:", vert);


    socket.emit('click', {"hor": hor, "vert": vert, "ls": 0});
});

