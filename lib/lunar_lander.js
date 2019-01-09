function gameStart () {
  button.className = "hidden";
  form.className = "hidden";
  scoreboard.className = "hidden";

  game = true;
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

function firstdraw() {
  state = states[3];
  drawStart();
  blinkStart();
}

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
    score = 0;
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
    gravity = .0015;
    stars = 20;
    superstar = 0;
    starArr = [];
    starState = false;

    
    landingspace = 70;
    space = 15;
    lines = Math.floor(canvas.width/space)
    landing = 5;
    groundArray = [];
    gameStart();
  }
 };

var highScores;

function sorter(a,b) {
  if (a.score < b.score) {
    return 1;
  }
  if (a.score > b.score) {
    return -1;
  }
  return 0;
}


function scoreParser (val) {
  const scores = Object.values(val);

  const array = [];

  for (let index = 0; index < scores.length; index++) {
    array.push(scores[index])
  }

  return array.sort(sorter)
}

function tableSetup(array) {
  for (let index = 0; index < array.length; index++) {
    
    const element = array[index];
    const rowNode = document.createElement('tr');

    const rank = document.createElement('td');
    const name = document.createElement('td');
    const rowScore = document.createElement('td');

    rowNode.appendChild(rank);
    rowNode.appendChild(name);
    rowNode.appendChild(rowScore);
    
    rank.innerHTML = index + 1;
    name.innerHTML = element.username;
    rowScore.innerHTML = element.score;

    scorebody.appendChild(rowNode);
  }

}

function tableReset() {
  while (scorebody.childElementCount > 1) {
    scorebody.removeChild (scorebody.lastElementChild)
  }
}

 window.onload = function () {

  const dbRefObject = firebase.database().ref('scores').orderByChild('score').limitToLast(5);
  
  // read
  // dbRefObject.on('value', snap => console.log(snap.val()));

  // write
  // firebase.database().ref('scores').push({username: 'test', score: 3})

  dbRefObject.on('value', snap => {
    tableReset();
    highScores = scoreParser(snap.val());
    tableSetup(highScores);
  })
  
  firstdraw();
}