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
var sound = "ON";

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
  if (sound === "ON") {
    document.getElementById("effect").play()
  }
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
          if (angle <= -10 || angle >= 10) {
            if ( fuel <= 300 ) {
              fuel = 0;
              y = y;
              state = states[1];
              explode();
              state = states[3];
            } else {
              y = y;
              ctx.clearRect(x, y, 20, 20)
              state = states[1];
              fuel -= 300;
              explode();
            }
          }
          if (angle > -10 && angle < 10) 
          { 
            if ((yspd >= -.5 && yspd <= .5) &&
            (xspd >= -.5 && xspd <= .5)) {
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
            } else {
              if ( fuel <= 300 ) {
                fuel = 0;
                y = y;
                state = states[1];
                explode();
                state = states[3];
              } else {
                y = y;
                ctx.clearRect(x, y, 20, 20)
                state = states[1];
                fuel -= 300;
                explode();
              }
            }
          }
        }
      }
    }
    else {
      ctx.beginPath();
      ctx.moveTo(groundArray[index-1][0], canvas.height);
      ctx.lineTo(groundArray[index-1][0], groundArray[index-1][1]);
      ctx.lineTo(groundArray[index][0], groundArray[index][1]);
      ctx.lineTo(groundArray[index][0], canvas.height);
      ctx.fillStyle = "#000";
      ctx.fill();

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
                explode();
                state = states[3];
              } 
              else {
                x=x;
                y=y;
                ctx.clearRect(x, y, 20, 20)
                state = states[1];
                fuel -= 300;
                explode();
               
              }
              // break;
            }
          
          
        }

      }

    }
  }
  if (state === states[0]) {
    x += xspd;
    y += yspd;
  }

}

var stars = 20;
var superstar = 0;
var starArr = [];

function fillStars() {
  superstar = Math.floor((Math.random()*stars));
  for (let index = 0; index < stars; index++) {
    starArr.push(
      [
        Math.floor((Math.random()*canvas.width)),
        Math.floor((Math.random()*canvas.height/3))
      ]
    )
    
  }
}

var starState = false;

function drawStars() {
  for (let index = 0; index < starArr.length - 5; index++) {
    if (index === superstar) {
      if (!starState) {
        ctx.beginPath();
        ctx.arc(starArr[index][0], starArr[index][1], 2, 0, Math.PI*2);
        ctx.fillStyle = "#FFF";
        ctx.fill();
        ctx.closePath();

        if (ctx.isPointInStroke(x, y)) {
          starState = true;
          fuel +=300;
        }
      }


    } else {
      ctx.beginPath();
      ctx.arc(starArr[index][0], starArr[index][1], 2, 0, Math.PI*2);
      ctx.fillStyle = "#FFF";
      ctx.fill();
      ctx.closePath();
    }
   }
  
}

function drawState() {
  ctx.font = "16px Lucida Grande";
  ctx.fillStyle = "#EEE"
  ctx.fillText("Sound: "+sound, canvas.width-200, 20)
}

function drawxspd() {
  ctx.font = "16px Lucida Grande";
  ctx.fillStyle = "#EEE"
  ctx.fillText("Xspd: "+Math.floor(x), 0, 100)
  // ctx.fillText("Xspd: "+Math.floor(xspd*10), 0, 100)
}

function drawyspd() {
  ctx.font = "16px Lucida Grande";
  ctx.fillStyle = "#EEE"
  // ctx.fillText("Yspd: "+Math.floor(yspd*10), 0, 80)
  ctx.fillText("Yspd: "+Math.floor(y), 0, 80)
}

function drawangle() {
  ctx.font = "16px Lucida Grande";
  ctx.fillStyle = "#EEE"
  ctx.fillText("Angle: "+angle, 0, 60)
}

function drawTime() {
  ctx.font = "16px Lucida Grande";
  ctx.fillStyle = "#EEE"
  ctx.fillText("Time: "+time, 0, 20)
}

function drawFuel() {
  ctx.font = "16px Lucida Grande";
  ctx.fillStyle = "#EEE"
  ctx.fillText("Fuel: "+Math.floor(fuel), 0, 40)
}

function drawDY() {
  ctx.font = "16px Lucida Grande";
  ctx.fillStyle = "#EEE"
  ctx.fillText(`Distance to Landing Zone ${Math.floor(dy)+1} meters`, canvas.width-350, 40)
}

var crashArr = [
  ["YOU JUST CRASHED A 100 MEGATON LAUNCHER", 475],
  ["YOU CREATED A SPACE CRATER", 300],
  ["CRASHED AUXILLARY TANK", 250]
]

function drawCrash() {
  ctx.font = "40px Lucida Grande";
  ctx.fillStyle = "#EEE";
  index = Math.floor(Math.random()*3);
  ctx.fillText(crashArr[index][0], canvas.width/2 -crashArr[index][1], canvas.height/4 );
}

function drawRetry() {
  ctx.font = "20px Lucida Grande";
  ctx.fillStyle = "#EEE";
  ctx.fillText("Click to Retry", canvas.width/2 -50, canvas.height/4 +80 );
}

function drawNewGame() {
  ctx.font = "20px Lucida Grande";
  ctx.fillStyle = "#EEE";
  ctx.fillText("Click to Start New Game", canvas.width/2 -100, canvas.height/4 +80 );
}

function drawGO() {
  ctx.font = "40px Lucida Grande";
  ctx.fillStyle = "#EEE";
  ctx.fillText("OUT OF FUEL, GAME OVER", canvas.width/2 - 250, canvas.height/4 );
}

function drawLand() {
  ctx.font = "40px Lucida Grande";
  ctx.fillStyle = "#EEE";
  ctx.fillText("NICE LANDING", canvas.width/2 - 100, canvas.height/4 );
}

function draw() {
  ctx.font = "16px Lucida Grande";
  ctx.fillStyle = "#EEE";
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
  } else {
  img.src;
  img.src = 'shuttle2_0.png';
 
  ctx.clearRect(0,0, canvas.width, canvas.height);
  if (state == states[0]) {
    drawShip();
  }
  drawTime();
  drawFuel();
  drawxspd();
  drawyspd();
  drawState();
  drawangle();
  drawDY();
  drawGround();
  drawStars();
  collisionDetection();
  if(state === states[1]) {
    drawCrash();
    drawRetry();
  } 
  else if (state === states[2]) {
    drawLand();
    drawRetry();
  }
  else if (state === states[3]) {
    drawGO();
    drawNewGame();
  }
  

  

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
  

  requestAnimationFrame(draw);
  }
}



var game;
var tick ;
function ticker() {
  time +=1;
}

function gameStart () {
  draw();
  tick = setInterval(ticker, 1000);
  groundArray = [];
  landingArr = [];
  starArr = [];
  starState = false;
  fillGroundArray();
  fillStars();
}


function endGame() {
  clearInterval(tick);
}

if (state !== "MOVING" ) {
  endGame();
}

firstdraw();
function firstdraw() {
  state = states[3];
  drawStart();
}

function drawStart() {
  ctx.font = "20px Lucida Grande";
  ctx.fillStyle = "#EEE";
  ctx.fillText("Your team of astronauts have finally found a potentially inhabitable planet,", 250, canvas.height/4 +30);
  ctx.fillText("but now you are tasked with landing the multi-billion dollar ship", 250, canvas.height/4 +50);
  ctx.fillText("Change Angle with Left and Right Arrow Keys", 100, canvas.height/4 +110);
  ctx.fillText("Accelerate with Up Arrow Key", 100, canvas.height/4 +130);
  ctx.fillText("P to toggle Sound", 100, canvas.height/4 + 150);
  ctx.fillText("TO LAND", 100, canvas.height/4 +190 );
  ctx.fillText("Horizontal/Vertical Speed between -5 and 5", 100, canvas.height/4 +210);
  ctx.fillText("Angle between -10 and 10", 100, canvas.height/4 +230);
  ctx.fillText("Click to Start", canvas.width/2 - 50, canvas.height/4 +280);
}

