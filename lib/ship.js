var img = new Image();


function explode() {
  var explosion = new Image();
  explosion.src = 'explosion_2.png';
  ctx.drawImage(explosion, 75, 0, 80 , 80, x, y, 20, 20);
  if (sound === "ON") {
    document.getElementById("effect").play()
  }
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