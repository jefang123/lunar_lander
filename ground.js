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