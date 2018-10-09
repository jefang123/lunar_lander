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