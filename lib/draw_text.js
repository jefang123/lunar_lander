function drawState() {
  ctx.font = "16px Lucida Grande";
  ctx.fillStyle = "#EEE"
  ctx.fillText("Sound: "+sound, canvas.width-200, 20)
}

function drawxspd() {
  ctx.font = "16px Lucida Grande";
  ctx.fillStyle = "#EEE"
  ctx.fillText("Xspd: "+Math.floor(xspd*10), 0, 100)
}

function drawyspd() {
  ctx.font = "16px Lucida Grande";
  ctx.fillStyle = "#EEE"
  ctx.fillText("Yspd: "+Math.floor(yspd*10), 0, 80)
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

// function draw() {
//   ctx.font = "16px Lucida Grande";
//   ctx.fillStyle = "#EEE";
//   ctx.fillText(`Altitude ${Math.floor(dy)+1} meters`, canvas.width-200, 40)
// }


function drawStart() {
  ctx.font = "20px Lucida Grande";
  ctx.fillStyle = "#EEE";
  ctx.fillText("Your team of astronauts have finally found a potentially habitable planet,", 250, canvas.height/4 +30);
  ctx.fillText("but now you are tasked with landing the multi-billion dollar ship", 250, canvas.height/4 +50);
  ctx.fillText("Change Angle with Left and Right Arrow Keys", 100, canvas.height/4 +110);
  ctx.fillText("Accelerate with Up Arrow Key", 100, canvas.height/4 +130);
  ctx.fillText("P to toggle Sound", 100, canvas.height/4 + 150);
  ctx.fillText("TO LAND", 100, canvas.height/4 +190 );
  ctx.fillText("Horizontal/Vertical Speed between -5 and 5", 100, canvas.height/4 +210);
  ctx.fillText("Angle between -10 and 10", 100, canvas.height/4 +230);
  ctx.fillText("Click to Start", canvas.width/2 - 50, canvas.height/4 +280);
}