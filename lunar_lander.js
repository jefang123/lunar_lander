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
var dy;


var toDegrees = 180 / Math.PI;
var toRadian = Math.PI / 180;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
canvas.onclick = function () { 
  if (state == states[1]) {
    x = 50;
    y = 30;
    ax = 0;
    ay = 0;
    xspd = 2;
    yspd = .001;
    state = "MOVING";
    time = 0;
    angle = -90; 
    gameStart();
  } 
  else if (state == states[2]) {
    x = 50;
    y = 30;
    ax = 0;
    ay = 0;
    xspd = 2;
    yspd = .001;
    state = "MOVING";
    time = 0;
    angle = -90; 
    gameStart();
  }  
  else if (state == states[3]) {
    fuel = 1000;
    x = 50;
    y = 30;
    ax = 0;
    ay = 0;
    xspd = 2;
    yspd = .001;
    state = "MOVING";
    time = 0;
    angle = -90; 
    gameStart();
  }
 };


function keyDownHandler(e) {
  switch (e.keyCode) {
    case 39 :
      rightPressed = true;
      break;
    case 37 : 
      leftPressed = true;
      break;
    case 38 :
      upPressed = true;
      break;
    case 40 : 
      downPressed = true;
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

var states=  [
    "MOVING",
    "BOOM",
    "LAND",
    "GAME OVER"
  ]

function tick() {
  time += 1
}

var img = new Image();

function explode() {
  var explosion = new Image();
  explosion.src = 'explosion_2.png';
  ctx.drawImage(explosion, 75, 0, 80 , 80, x, y, 20, 20);

}

function drawGround() {
  ctx.beginPath();
  ctx.moveTo(0, canvas.height -30 )
  ctx.lineTo(canvas.width, canvas.height -30)
  ctx.stroke();
}

function drawState() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD"
  ctx.fillText("State: "+state, canvas.width-200, 20)
}

function drawxspd() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD"
  ctx.fillText("Xspd: "+Math.floor(xspd*10), 0, 100)
}

function drawyspd() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD"
  ctx.fillText("Yspd: "+Math.floor(yspd*10), 0, 80)
}

function drawangle() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD"
  ctx.fillText("Angle: "+angle, 0, 60)
}

function drawTime() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD"
  ctx.fillText("Time: "+time, 0, 20)
}

function drawFuel() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD"
  ctx.fillText("Fuel: "+Math.floor(fuel), 0, 40)
}

function drawDY() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD"
  ctx.fillText(`Altitude ${Math.floor(dy)+1} meters`, canvas.width-200, 40)
}

function drawShip () {
  if (state == states[1] || state == states[3]) {
    explode();
  } 
  else {
    var shipX = x ;
    var shipY = y ;
    var thruster = new Image();
    thruster.src = 'explosion_2.png';

    ctx.translate(shipX, shipY);
    ctx.rotate(angle*toRadian );

    lx = 0; 
    ly = 0; 
    if (angle >= -90 && angle < 0) { 
      lx = (Math.sin(angle*(toRadian)) *20);
    }
    if(angle > 0 && angle <= 90) {
      ly = -(Math.sin(angle*(toRadian)) *20);
    }

    ctx.drawImage(img, lx, ly, 20 , 20);
    if (upPressed) {
      ctx.drawImage(thruster, 220, 0, 80, 80, lx+1, ly+8, 10, 20);
      ctx.drawImage(thruster, 220, 0, 80, 80, lx+10, ly+8, 10, 20);
    }
    ctx.rotate(-(angle * toRadian));
    ctx.translate(-shipX,-shipY);
  }
}

function draw() {
  if (state !== "MOVING") {
    endGame();
  }  
  img.src;
  img.src = 'shuttle2_0.png';
 
  ctx.clearRect(0,0, canvas.width, canvas.height);

  drawShip();
  drawTime();
  drawFuel();
  drawxspd();
  drawyspd();
  drawState();
  drawangle();
  drawDY();
  drawGround();

  if (rightPressed && angle < 90 ) {
    angle += 1   
  }
  else if (leftPressed && angle > -90 ) {
    angle -= 1 
  }

  
  if (upPressed) {
    if (upPressed && fuel == 0) {
      upPressed = false
    }
    ay = Math.cos(angle*toRadian) * -.005
    ax = Math.sin(angle*toRadian) * .005
    xspd += ax 
    yspd += (ay + .0015) 
    fuel -= .1;
    if (x > canvas.width-20) {
      x = 0;
    }
    if (x < 0) {
      x = canvas.width-20;
    }
    if (y < 0) {
      y = 0;
    }
  } 

  if(!upPressed) {
    xspd += -.0002;
    yspd+= .0015
  
    if (x > canvas.width-20) {
        x = 0;
    }
    if (x < 0) {
      x = canvas.width-20;
    }
    if (y < 0) {
      y = 0;
    }
}
  if (state != states[0]) {
    dy = 0;
  } 
  else {
    dy = (canvas.height -(30+20)) - y;
  }

  if (state === states[0]) {

    if (y >= (canvas.height -(30 +20 ))) {
      if (angle > -11 && angle < 11) 
        { 
          if ((yspd > -.5 && yspd < .5) &&
          (xspd > -.5 && xspd < .5)) {
            state = states[2];
            y = canvas.height - (30+20);
            alert("YOU'VE LANDED");
          }
          else {
            if ( fuel <= 300 ) {
              fuel = 0;
              y = canvas.height - (30 +20)
              state = states[1];
              state = states[3];
              alert("OUT OF FUEL, GAME OVER")
            } else {
              y = canvas.height - (30+20)
              ctx.clearRect(x, y, 20, 20)
              state = states[1];
              fuel -= 300;
              explode();
              alert(`CRASHED, ${Math.floor(fuel)} FUEL remaining`)
            }
          }
        }
      else {
        if ( fuel <= 300 ) {
          fuel = 0;
          y = canvas.height - (30 +20)
          state = states[1];
          state = states[3];
          alert("OUT OF FUEL, GAME OVER")
        } else {
          y = canvas.height - (30+20)
          ctx.clearRect(x, y, 20, 20)
          state = states[1];
          fuel -= 300;
          explode();
          alert(`CRASHED, ${Math.floor(fuel)} FUEL remaining`)
        }
      }
    } else {
      x += xspd;
      y += yspd;
    }
  }

}



var game;
var ticker;
function gameStart () {
  game = setInterval(draw,10);
  tick = setInterval(ticker, 1000);
}


function endGame() {
  clearInterval(game)
  clearInterval(tick)
}

gameStart();
if (state !== "MOVING" ) {
  endGame();
}
