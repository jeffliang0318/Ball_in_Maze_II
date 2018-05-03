const Util = require("./util");
const MovingObject = require("./moving_object");
const Ball = require("./ball");

const DEFAULTS = {
  COLOR: "red",
  HOLE_RADIUS: 20,
  SPEED: 0
};

class Goal extends MovingObject {
  constructor(options = {}) {
    options.color = DEFAULTS.COLOR;
    options.pos = options.pos ;
    options.radius = DEFAULTS.HOLE_RADIUS;
    options.vel = [0,0];
    super(options);
  }

  collideWith(otherObject) {
    if (otherObject instanceof Ball) {
      otherObject.win();
      return true;
    }
    return false;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }
}

module.exports = Goal;
