/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const Util = {
  // Normalize the length of the vector to 1, maintaining direction.
  dir(vec) {
    const norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  },
  // Find distance between two points.
  dist(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },
  // Find the length of the vector.
  norm(vec) {
    return Util.dist([0, 0], vec);
  },
  // Return a randomly oriented vector with the given length.
  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  // Scale the length of a vector by the given amount.
  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  wrap(coord, max) {
    if (coord < 0) {
      return max - (coord % max);
    } else if (coord > max) {
      return coord % max;
    } else {
      return coord;
    }
  }
};

module.exports = Util;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
    this.isWrappable = true;
  }

  collideWith(otherObject) {
    // default do nothing
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }

  isCollidedWith(otherObject) {
    const centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  }

  move(timeDelta) {
    // timeDelta is number of milliseconds since last move
    // if the computer is busy the time delta will be larger
    // in this case the MovingObject should move farther in this frame
    // velocity of object is how far it should move in 1/60th of a second
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
        offsetX = this.vel[0] * velocityScale,
        offsetY = this.vel[1] * velocityScale;
    this.pos = [ this.pos[0] + offsetX, this.pos[1] + offsetY];

    if (this.game.isOutOfBounds(this.pos)) {
        this.stop();
    }
  }

  remove() {
    this.game.remove(this);
  }
}

const NORMAL_FRAME_TIME_DELTA = 2000 / 60;

module.exports = MovingObject;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(1);
const Util = __webpack_require__(0);

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(4);
const GameView = __webpack_require__(8);

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();
});


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Wall = __webpack_require__(5);
const Ball = __webpack_require__(2);
const Util = __webpack_require__(0);
const Hole = __webpack_require__(6);
const Goal = __webpack_require__(7);

class Game {
  constructor() {
    this.asteroids = [];
    this.holes = [];
    this.goals = [];
    this.balls = [];
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
    this.addWalls();
  }

  add(object) {
    if (object instanceof Wall) {
      this.asteroids.push(object);
    } else if (object instanceof Hole) {
      this.holes.push(object);
    } else if (object instanceof Ball) {
      this.balls.push(object);
    } else if (object instanceof Goal) {
      this.goals.push(object);
    } else {
      throw new Error("unknown type of object");
    }
  }
  addWalls() {
    for (var y = 0; y < this.map.length; y += 1) {
      for (var x = 0; x < this.map.length; x += 1) {
        if (this.map[y][x] === 1) {
          // console.log(this.map[y]);
          this.add(new Wall({ game: this, pos: [x*40,y*40] }));
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
    const ball = new Ball({
      pos: this.randomPosition(),
      game: this
    });

    this.add(ball);

    return ball;
  }

  allObjects() {
    return [].concat(this.balls, this.asteroids, this.holes, this.goals);
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
    background.src = "http://res.cloudinary.com/dgxmjwbrc/image/upload/v1525384579/woodbk.jpg";
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
    } else if (object instanceof Wall) {
      this.asteroids.splice(this.asteroids.indexOf(object), 1);
    } else if (object instanceof Ball) {
      this.balls.splice(this.balls.indexOf(object), 1);
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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);
const MovingObject = __webpack_require__(1);
const Ball = __webpack_require__(2);

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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);
const MovingObject = __webpack_require__(1);
const Ball = __webpack_require__(2);

const DEFAULTS = {
  COLOR: "black",
  HOLE_RADIUS: 13,
  SPEED: 0
};

class Hole extends MovingObject {
  constructor(options = {}) {
    options.color = DEFAULTS.COLOR;
    options.pos = options.pos ;
    options.radius = DEFAULTS.HOLE_RADIUS;
    options.vel = [0,0];
    super(options);
  }

  collideWith(otherObject) {
    if (otherObject instanceof Ball) {
      otherObject.relocate();
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

module.exports = Hole;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);
const MovingObject = __webpack_require__(1);
const Ball = __webpack_require__(2);

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


/***/ }),
/* 8 */
/***/ (function(module, exports) {

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ball = this.game.addBall();
  }

  bindKeyHandlers() {
    const ball = this.ball;

    Object.keys(GameView.MOVES).forEach((k) => {
      const move = GameView.MOVES[k];
      key(k, () => { ball.power(move); });
    });
  }

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;
    // start the animation
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    // every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }
}

GameView.MOVES = {
  w: [0, -1],
  a: [-1, 0],
  s: [0, 1],
  d: [1, 0],
};

module.exports = GameView;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map