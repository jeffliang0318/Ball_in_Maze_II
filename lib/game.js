const Asteroid = require("./asteroid");
const Ball = require("./ball");
const Util = require("./util");
const Hole = require("./hole");
const Goal = require("./goal");

class Game {
  constructor() {
    this.asteroids = [];
    this.holes = [];
    this.goals = [];
    this.ships = [];
    this.pos = [];
    this.map = [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,5,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,3,1],
      [1,1,1,1,1,1,1,2,2,1,2,1,1,1,1,2,1,1,1,1],
      [1,4,2,2,2,2,1,2,2,2,2,1,2,2,2,2,2,2,2,1],
      [1,2,2,2,2,2,1,2,2,1,1,1,2,3,2,1,2,2,2,1],
      [1,1,1,2,1,1,1,1,3,1,2,2,2,2,2,1,2,1,1,1],
      [1,2,2,2,2,3,2,2,2,2,3,2,2,2,2,1,2,2,2,1],
      [1,2,2,3,2,2,2,2,3,2,2,1,1,1,1,1,1,1,2,1],
      [1,2,1,1,1,1,1,1,2,2,2,2,2,2,2,1,2,2,2,1],
      [1,2,2,2,2,2,2,1,2,3,2,2,2,2,2,1,2,1,2,1],
      [1,2,2,2,2,2,2,1,1,1,1,1,1,2,2,1,2,1,1,1],
      [1,1,1,1,1,2,2,1,2,2,2,2,2,2,3,1,2,2,2,1],
      [1,3,2,2,2,2,1,2,2,2,3,2,2,2,2,1,2,2,2,1],
      [1,2,2,2,2,2,1,2,2,1,1,1,1,2,2,1,1,2,2,1],
      [1,2,1,1,1,1,1,2,2,2,2,1,2,2,2,2,2,2,2,1],
      [1,2,2,2,2,2,2,2,2,2,2,1,2,2,1,1,1,1,1,1],
      [1,2,2,1,2,2,1,1,1,1,1,1,2,2,2,2,2,1,2,1],
      [1,2,1,1,2,2,2,2,2,2,2,1,2,1,1,2,2,1,2,1],
      [1,2,2,1,2,2,3,2,2,2,2,2,2,2,2,3,2,2,2,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ];
    this.addAsteroids();
  }

  add(object) {
    if (object instanceof Asteroid) {
      this.asteroids.push(object);
    } else if (object instanceof Hole) {
      this.holes.push(object);
    } else if (object instanceof Ball) {
      this.ships.push(object);
    } else if (object instanceof Goal) {
      this.goals.push(object);
    } else {
      throw new Error("unknown type of object");
    }
  }
  addAsteroids() {
    for (var y = 0; y < this.map.length; y += 1) {
      for (var x = 0; x < this.map.length; x += 1) {
        if (this.map[y][x] === 1) {
          // console.log(this.map[y]);
          this.add(new Asteroid({ game: this, pos: [x*40,y*40] }));
        } else if (this.map[y][x] === 3) {
          // console.log(this.map[y][x]);
          this.add(new Hole({ game: this, pos: [x*40,y*40]}));
          // debugger;
        } else if (this.map[y][x] === 4) {
          // console.log(this.map[y][x]);
          this.add(new Goal({ game: this, pos: [x*40,y*40]}));
          // debugger;
        }
      }
    }
  }

  addBall() {
    const ship = new Ball({
      pos: this.randomPosition(),
      game: this
    });

    this.add(ship);

    return ship;
  }

  allObjects() {
    return [].concat(this.ships, this.asteroids, this.holes, this.goals);
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];

        if (obj1.isCollidedWith(obj2)) {
          const collision = obj1.collideWith(obj2);
          if (collision) return;
        }
      }
    }
  }

  draw(ctx) {
    // ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    // ctx.fillStyle = Game.BG_COLOR;
    // ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    var background = new Image();
    background.src = "http://res.cloudinary.com/dgxmjwbrc/image/upload/v1523909589/wood-1043207_1280.jpg";
    // Make sure the image is loaded first otherwise nothing will draw.
    background.onload = function(){
    ctx.drawImage(background,0,0);
};

// Draw whatever else over top of it on the canvas.

    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
  }

  isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  }

  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      object.move(delta);
    });
  }

  randomPosition() {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  }

  remove(object) {
    if (object instanceof Hole) {
      this.holes.splice(this.holes.indexOf(object), 1);
    } else if (object instanceof Asteroid) {
      this.asteroids.splice(this.asteroids.indexOf(object), 1);
    } else if (object instanceof Ball) {
      this.ships.splice(this.ships.indexOf(object), 1);
    } else {
      throw new Error("unknown type of object");
    }
  }

  step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();
  }

  wrap(pos) {
    return [
      Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
    ];
  }
}

Game.BG_COLOR = "#000000";
Game.DIM_X = 760;
Game.DIM_Y = 760;
Game.FPS = 32;
Game.NUM_ASTEROIDS = 10;

module.exports = Game;
