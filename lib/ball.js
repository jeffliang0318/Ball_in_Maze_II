const MovingObject = require("./moving_object");
const Util = require("./util");

class Ball extends MovingObject {
  constructor(options) {
    options.radius = Ball.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = "#009933";
    options.pos =  [ 40, 40 ];
    super(options);
  }


  power(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

  relocate() {
    this.pos = [ 40, 40 ];
    this.vel = [0, 0];
  }

  stop() {
    this.pos = [ this.pos[0]-this.vel[0], this.pos[1]-this.vel[1]];
    this.vel = [0, 0];
  }

  win (){
    this.pos = [ this.pos[0]-this.vel[0], this.pos[1]-this.vel[1]];
    this.vel = [0, 0];
    alert("YOU WIN!!")
  }
}

Ball.RADIUS = 10;
module.exports = Ball;
