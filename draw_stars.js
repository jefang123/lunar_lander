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