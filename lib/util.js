const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
var x = 50;
var y = 30;
var ax = 0;
var ay = 0;
var ixspd = 2;
var xspd = 2;
var iyspd = .001;
var yspd = .001;
var state = "MOVING";
var time = 0;
var fuel = 1000;
var angle = -90; 
var gravity = .0015;
var dy;

var stars = 20;
var superstar = 0;
var starArr = [];
var starState = false;

var sound = "ON";

var states=  [
  "MOVING",
  "BOOM",
  "LAND",
  "GAME OVER"
]


var landingspace = 70;
var space = 15;
var lines = Math.floor(canvas.width/space)
var landing = 5;
var groundArray = [];
let landingArr =[];

var toDegrees = 180 / Math.PI;
var toRadian = Math.PI / 180;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
document.addEventListener("keydown", 
  keyDownHandler, 
  false);
document.addEventListener("keyup", 
  keyUpHandler, 
  false);

function keyDownHandler(e) {
  switch (e.keyCode) {
    case 39 :
      rightPressed = true;
      break;
    case 37 : 
      leftPressed = true;
      break;
    case 38 :
      if (fuel == 0) {
        upPressed = false;
      } else {
      upPressed = true;
      }
      break;

    case 40 : 
      downPressed = true;
      break;
    case 80 :
      if (sound === "ON") {
        sound = "OFF";
      } else {
        sound = "ON";
      }
      
      break;
  }
}

function keyUpHandler(e) {
  switch (e.keyCode) {
    case 39 : 
      rightPressed = false;
      break;
    case 37 : 
      leftPressed = false;
      break;
    case 38 : 
      upPressed = false;
      break;
    case 40 : 
      downPressed = false;
      break;

  }
}

function tick() {
  time += 1
}

var game;
var tick;

function ticker() {
  time +=1;
}