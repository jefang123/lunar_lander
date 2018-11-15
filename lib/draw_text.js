function drawState() {
  ctx.font = "20px 'Press Start 2P'";
  ctx.fillStyle = "#EEE"
  ctx.fillText("Sound:"+sound, canvas.width-200, 20)
}

function drawxspd() {
  let color = "red";
  if (xspd > -.6 && xspd < .6) {
    color = "green";
  }
  ctx.font = "20px 'Press Start 2P'";
  ctx.fillStyle = color;
  ctx.fillText("Xspd: "+Math.floor(xspd*10), 0, 100)
}

function drawyspd() {
  let color = "red";
  if (yspd > -.6 && yspd < .6) {
    color = "green";
  }
  ctx.font = "20px 'Press Start 2P'";
  ctx.fillStyle = color;
  ctx.fillText("Yspd: "+Math.floor(yspd*10), 0, 80)
}

function drawangle() {
  let color = "red";
  if (angle >= -11 && angle <= 11) {
    color = "green";
  }
  ctx.font = "20px 'Press Start 2P'";
  ctx.fillStyle = color;
  ctx.fillText("Angle: "+angle, 0, 60)
}

function drawTime() {
  ctx.font = "20px 'Press Start 2P'";
  ctx.fillStyle = "#EEE"
  ctx.fillText("Time: "+time, 0, 20)
}

function drawFuel() {
  ctx.font = "20px 'Press Start 2P'";
  ctx.fillStyle = "#EEE"
  ctx.fillText("Fuel: "+Math.floor(fuel), 0, 40)
}

function drawDY() {
  ctx.font = "20px 'Press Start 2P'";
  ctx.fillStyle = "#EEE"
  ctx.fillText(`Distance to Landing Zone ${Math.floor(dy)+1} meters`, canvas.width-350, 40)
}

var crashArr = [
  ["YOU JUST CRASHED A 100 MEGATON LAUNCHER", 425],
  ["YOU CREATED A SPACE CRATER", 300],
  ["CRASHED AUXILLARY TANK", 250]
]

function drawCrash() {
  ctx.font = "20px 'Press Start 2P'";
  ctx.fillStyle = "#EEE";
  index = Math.floor(Math.random()*3);
  ctx.fillText(crashArr[index][0], canvas.width/2 -crashArr[index][1], canvas.height/4 );
  drawLostFuel()
}

function drawLostFuel() {
  ctx.font = "20px 'Press Start 2P'";
  ctx.fillStyle = "#EEE";
  ctx.fillText('300 FUEL UNITS LOST', 350, canvas.height/4 + 40)
}

function drawRetry() {
  ctx.font = "20px 'Press Start 2P'";
  ctx.fillStyle = "#EEE";
  ctx.fillText("Click to Retry", 350, canvas.height/4 +80 );
}

function drawNewGame() {
  ctx.font = "20px 'Press Start 2P'";
  ctx.fillStyle = "#EEE";
  ctx.fillText("Click to Start New Game", 350, canvas.height/4 +80 );
}

function drawGO() {
  ctx.font = "20px 'Press Start 2P'";
  ctx.fillStyle = "#EEE";
  ctx.fillText("OUT OF FUEL, GAME OVER", canvas.width/2 - 250, canvas.height/4 );
}

function drawLand() {
  ctx.font = "20px 'Press Start 2P'";
  ctx.fillStyle = "#EEE";
  ctx.fillText("NICE LANDING", canvas.width/2 - 100, canvas.height/4 );
}

// function draw() {
// ctx.font = "20px 'Press Start 2P'";
//   ctx.fillStyle = "#EEE";
//   ctx.fillText(`Altitude ${Math.floor(dy)+1} meters`, canvas.width-200, 40)
// }


function drawStart() {
  ctx.font = "16px 'Press Start 2P'";
  ctx.fillStyle = "#EEE";
  ctx.fillText("Your team of astronauts have finally found a Earth-like terrestial planet", 25, canvas.height/4 +30);
  ctx.fillText("You are now tasked with landing the multi-billion dollar ship", 25, canvas.height/4 +50);
  ctx.fillText("Change Angle with Left and Right Arrow Keys", 100, canvas.height/4 +110);
  ctx.fillText("Accelerate with Up Arrow Key", 100, canvas.height/4 +130);
  ctx.fillText("P to toggle Sound Effects", 100, canvas.height/4 + 150);
  ctx.fillStyle= "Green";
  ctx.fillText("MAKE ALL PARAMETERS GREEN TO LAND", 100, canvas.height/4 +190 );
  ctx.fillStyle= "Red";
  ctx.fillText("RED PARAMETERS WILL CAUSE A CRASH ", 100, canvas.height/4 +210)
}

function drawClickToStart() {
  ctx.fillStyle = "#EEE";
  ctx.fillText("Click to Start", canvas.width/2 - 50, canvas.height/4 +280);
}

function drawNothing () {

}

function blinkStart() {
  if (game) {
    return null
  }
  ctx.clearRect(canvas.width/2 - 60 , canvas.height/4 + 250, canvas.width, canvas.height)
  let functions = [
    drawClickToStart,
    drawClickToStart,
    drawClickToStart,
    drawClickToStart,
    drawClickToStart,
    drawClickToStart,
    drawClickToStart,
    drawClickToStart,
    drawClickToStart,
    drawClickToStart,
    drawClickToStart,
    drawClickToStart,
    drawClickToStart,
    drawClickToStart,
    drawClickToStart,
    drawClickToStart,
    drawNothing,
    drawNothing,
    drawNothing,
    drawNothing,
    drawNothing,
    drawNothing,
    drawNothing,
    drawNothing
  ]

  functions[Math.floor(n%24)]()
  n+=1
  requestAnimationFrame(blinkStart)
  
}


function blinkRetry() {
  ctx.clearRect(340 , canvas.height/4 + 50, 570, canvas.height/4 +80)
  let functions = [
    drawRetry,
    drawRetry,
    drawRetry,
    drawRetry,
    drawRetry,
    drawRetry,
    drawRetry,
    drawRetry,
    drawRetry,
    drawRetry,
    drawRetry,
    drawRetry,
    drawRetry,
    drawRetry,
    drawRetry,
    drawRetry,
    drawNothing,
    drawNothing,
    drawNothing,
    drawNothing,
    drawNothing,
    drawNothing,
    drawNothing,
    drawNothing
  ]
  functions[Math.floor(n%24)]()
  n+=1
  requestAnimationFrame(blinkRetry)
}

function blinkNG() {
  ctx.clearRect(340 , canvas.height/4 + 50, 570, canvas.height/4 +80)
  let functions = [
    drawNewGame,
    drawNewGame,
    drawNewGame,
    drawNewGame,
    drawNewGame,
    drawNewGame,
    drawNewGame,
    drawNewGame,
    drawNewGame,
    drawNewGame,
    drawNewGame,
    drawNewGame,
    drawNewGame,
    drawNewGame,
    drawNewGame,
    drawNewGame,
    drawNothing,
    drawNothing,
    drawNothing,
    drawNothing,
    drawNothing,
    drawNothing,
    drawNothing,
    drawNothing
  ]
  functions[Math.floor(n%24)]()
  n+=1
  requestAnimationFrame(blinkNG)
}