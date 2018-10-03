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

// gravity cap = .0040

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
      if (fuel == 0) {
        upPressed = false;
      } else {
      upPressed = true;
      }
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

var landingspace = 70;
var space = 15;
var lines = Math.floor(canvas.width/space)
var landing = 5;
var groundArray = [];
let landingArr =[];

function fillGroundArray() {
  for (let index = 0; index < landing; index++) {
    landingArr.push(Math.floor((Math.random() * (lines-10)) + 5));
  }
  let lastx = 0;
  let lasty = canvas.height;
  for (let index=0; index < lines; index++) {
    if (index == 0) {
      groundArray.push([lastx, lasty])
    }
    else if (!landingArr.includes(index)) {
      lastx += space;
      if (lasty > canvas.height-200) {
        lasty -= Math.floor(Math.random()*canvas.height/20)
      } else {
        lasty += Math.floor(Math.random()*canvas.height/20)
      }
      groundArray.push([lastx, lasty])
    }
    else if (landingArr.includes(index)) {
      lastx += landingspace;
      groundArray.push([lastx, lasty]);
    }
    else {
      groundArray.push( [canvas.width, canvas.height] );
      lastx = 0;
      lasty = canvas.height;
    }
  }
}

function drawGround() {
  
  for (let index= 0; index < groundArray.length; index++) {
    if (index == 0) {
      ctx.beginPath();
      ctx.moveTo(groundArray[index][0],groundArray[index][1]);
    }
    else if (index < groundArray.length) {
      ctx.lineTo(groundArray[index][0],groundArray[index][1])
    }
  
  }
  ctx.stroke();
}
let land;
let crash;



function collisionDetection() {
  for (let index= 1; index < groundArray.length; index++) {
    if (landingArr.includes(index)) {
      if (x >= groundArray[index-1][0] && x <= groundArray[index][0]) {
        dy = (groundArray[index][1] - (y+20));
      }
      ctx.beginPath();
      ctx.moveTo(groundArray[index-1][0],groundArray[index-1][1]);
      ctx.lineTo(groundArray[index][0],groundArray[index][1])
      ctx.strokeStyle="#FFF";
      ctx.stroke();
      
      
      if (state === states[0]) {
        if (ctx.isPointInStroke(x, y+20)) {
          if (angle <= -11 || angle >= 11) {
            if ( fuel <= 300 ) {
              fuel = 0;
              y = y;
              state = states[1];
              state = states[3];
              alert("OUT OF FUEL, GAME OVER")
            } else {
              y = y;
              ctx.clearRect(x, y, 20, 20)
              state = states[1];
              fuel -= 300;
              explode();
              alert(`CRASHED, ${Math.floor(fuel)} FUEL remaining`)
            }
          }
          if (angle > -11 && angle < 11) 
          { 
            if ((yspd > -.5 && yspd < .5) &&
            (xspd > -.5 && xspd < .5)) {
              state = states[2];
              y = y;
              if (landingspace > 30) {
                landingspace -= 10;
              }
              if (landing > 2) {
                landing -= 1;
              } 

              if (gravity < .0040) {
                gravity += .0005
              }

              alert("YOU'VE LANDED");
            } else {
              if ( fuel <= 300 ) {
                fuel = 0;
                y = y;
                state = states[1];
                state = states[3];
                alert("OUT OF FUEL, GAME OVER")
              } else {
                y = y;
                ctx.clearRect(x, y, 20, 20)
                state = states[1];
                fuel -= 300;
                explode();
                alert(`CRASHED, ${Math.floor(fuel)} FUEL remaining`)
              }
            }
          }
        }

      }
    }
    else {
      ctx.beginPath();
      
      // ctx.moveTo(groundArray[index-1][0],groundArray[index-1][1]);
      // ctx.lineTo(groundArray[index][0],groundArray[index][1])
      // ctx.stroke();
      ctx.moveTo(groundArray[index-1][0], canvas.height);
      ctx.lineTo(groundArray[index-1][0], groundArray[index-1][1]);
      ctx.lineTo(groundArray[index][0], groundArray[index][1]);
      ctx.lineTo(groundArray[index][0], canvas.height);
      ctx.fillStyle = "#000";
      ctx.fill();

      // let deltay = groundArray[index][1] - groundArray[index-1][1];
      // let deltax = groundArray[index][0] - groundArray[index-1][0];
      // let theta = Math.atan2(deltay, deltax)/(Math.PI/180);
      // let distancex = (Math.sin(theta*toRadian) *20);
      // let distance = (Math.sin(theta*toRadian) *20);
      // crash = ctx.isPointInStroke(x,y_20);
      if (state === states[0]) {

        for (let index = 0; index < 21; index++) {
            let lx = 0;
            let ly = 0;

            if (angle< 0) {
              lx = index;
              ly = -(Math.sin(angle*toRadian))*20;
            }
            if (angle > 0) {
              ly = (Math.sin(angle*toRadian))*20;
              lx = index;
            }
            if (ctx.isPointInStroke(x+ lx, y+ly)) {
              if ( fuel <= 300 ) {
                fuel = 0;
                x = x
                y = y;
                state = states[1];
                state = states[3];
                alert("OUT OF FUEL, GAME OVER")
              } 
              else {
                x=x;
                y=y;
                ctx.clearRect(x, y, 20, 20)
                state = states[1];
                fuel -= 300;
                explode();
                alert(`CRASHED, ${Math.floor(fuel)} FUEL remaining`)
              }
              break;
            }
            
         
         
          
          
        }

        // if (ctx.isPointInStroke(x, y-distance)) {
        //   if ( fuel <= 300 ) {
        //     fuel = 0;
        //     y = y;
        //     state = states[1];
        //     state = states[3];
        //     alert("OUT OF FUEL, GAME OVER")
        //   } 
        //   else {
        //     y = y;
        //     ctx.clearRect(x, y, 20, 20)
        //     state = states[1];
        //     fuel -= 300;
        //     explode();
        //     alert(`CRASHED, ${Math.floor(fuel)} FUEL remaining`)
        //   }
        // }



      }

    }
  }
  if (state === states[0]) {
    x += xspd;
    y += yspd;
  }

}

// var stars = 10;


// function drawStars() {

// }

function drawState() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#EEE"
  ctx.fillText("State: "+state, canvas.width-200, 20)
}

function drawxspd() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#EEE"
  ctx.fillText("Xspd: "+Math.floor(xspd*10), 0, 100)
}

function drawyspd() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#EEE"
  ctx.fillText("Yspd: "+Math.floor(yspd*10), 0, 80)
}

function drawangle() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#EEE"
  ctx.fillText("Angle: "+angle, 0, 60)
}

function drawTime() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#EEE"
  ctx.fillText("Time: "+time, 0, 20)
}

function drawFuel() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#EEE"
  ctx.fillText("Fuel: "+Math.floor(fuel), 0, 40)
}

function drawDY() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#EEE"
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

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  if (state !== "MOVING") {
    endGame();
  }  
  img.src;
  img.src = 'shuttle2_0.png';
 
  ctx.clearRect(0,0, canvas.width, canvas.height);
  // drawBall();
  drawShip();
  drawTime();
  drawFuel();
  drawxspd();
  drawyspd();
  drawState();
  drawangle();
  drawDY();
  drawGround();
  collisionDetection();

  if (rightPressed && angle < 90 ) {
    angle += 1   
  }
  else if (leftPressed && angle > -90 ) {
    angle -= 1 
  }

  if (upPressed) {
    if (fuel > 0) {
      ay = Math.cos(angle*toRadian) * -.005
      ax = Math.sin(angle*toRadian) * .005
      xspd += ax 
      yspd += (ay + gravity) 
      fuel -= .1
    } else {
      fuel = 0;
      upPressed = false;
    }
    
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
    yspd+= gravity;
  
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
  
}



var game;
var ticker;
function gameStart () {
  game = setInterval(draw,10);
  tick = setInterval(ticker, 1000);
  groundArray = [];
  landingArr = [];
  fillGroundArray();
}


function endGame() {
  clearInterval(game);
  clearInterval(tick);
}

gameStart();
if (state !== "MOVING" ) {
  endGame();
}
