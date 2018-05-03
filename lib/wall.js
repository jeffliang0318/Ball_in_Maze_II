const Util = require("./util");
const MovingObject = require("./moving_object");
const Ball = require("./ball");

const DEFAULTS = {
  COLOR: "#8B4513",
  RADIUS: 15,
  SPEED: 0
};

class Asteroid extends MovingObject {
  constructor(options = {}) {
    options.color = "#800000";
    options.pos = options.pos ;
    options.radius = DEFAULTS.RADIUS;
    options.vel = [0,0];
    super(options);
  }

    draw(ctx) {
      ctx.fillStyle = this.color;

      ctx.beginPath();
      ctx.arc(
        this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
      );
      ctx.fill();
      // ctx.rect(20, 20, 150, 100);
      // ctx.stroke();
      // ctx.beginPath();
      // ctx.clearRect(this.pos[0], this.pos[1], this.RADIUS, this.RADIUS);
      // ctx.fillStyle = this.BG_COLOR;
      // ctx.fillRect(this.pos[0], this.pos[1], this.RADIUS, this.RADIUS);

      // ctx.rect(
      //   this.pos[0], this.pos[1], this.RADIUS, this.RADIUS
      // );
      // ctx.fillStyle = this.color;
      // ctx.stroke();
      // ctx.fill();
      //
      // ctx.rect(20, 20, 150, 100);
      // ctx.stroke();
      // ctx.fillStyle = "#505050";
      // ctx.fill();
      // let length = Math.sqrt(Math.pow(DEFAULTS.RADIUS, 2) + Math.pow(DEFAULTS.RADIUS, 2));
    // ctx.rect(this.pos[0], this.pos[1], DEFAULTS.RADIUS, DEFAULTS.RADIUS);
    // ctx.stroke();
    // ctx.fillStyle = "#505050";
    // ctx.fill();
    }

  collideWith(otherObject) {
    if (otherObject instanceof Ball) {
      otherObject.stop();
      return true;
    }
    return false;
  }
}

module.exports = Asteroid;
