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
            if ((yspd > -.6 && yspd < .6) &&
            (xspd > -.6 && xspd < .6)) {
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
