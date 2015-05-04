(function(){
  window.AS = window.AS || {};

  var Game = AS.Game = function(xDim, yDim){
    this.DIM_X = xDim;
    AS.util.config.DIM_X = xDim;
    this.DIM_Y = yDim;
    AS.util.config.DIM_Y = yDim;
    this.score = 0;
    this.reset();

  };

  AS.Game.prototype.drawScore = function(ctx) {
    ctx.fillStyle = "black";
    ctx.font = "italic "+14+"pt Arial ";
    ctx.fillText(this.score , 80, 60);
  };

  AS.Game.prototype.drawStart = function(ctx) {
    var img = document.createElement('img');
    img.src = 'SMASHtroids-welcome.png';
    img.onload = function () {
    ctx.drawImage(img,this.DIM_X/2 - 300, this.DIM_Y/2 - 200, 600, 400);
  }.bind(this);
  };


  AS.Game.randPos = function() {
    return [ AS.util.config.DIM_X * Math.random(), AS.util.config.DIM_Y * Math.random()];
  };

  AS.Game.prototype.addObj = function(obj) {
    if (obj instanceof AS.Asteroid) {
      this.asteroids.push(obj);
    }
    if (obj instanceof AS.Bullet) {
      this.bullets.push(obj);
    }
    this.allObjects.push(obj);
  };

  AS.Game.prototype.addAsteroids = function(){
    for (var i = 0; i < AS.util.config.NUM_ASTEROIDS; i ++) {
      this.addObj(new AS.Asteroid({pos: AS.Game.randPos(), game: this}));
    }
  };

  AS.Game.prototype.addBullets = function(options) {
    this.addObj(new AS.Bullet(options));
  };

  AS.Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, AS.util.config.DIM_X + 40, AS.util.config.DIM_Y + 40);
    var game = this;
    this.drawScore(ctx);
    ctx.beginPath();
    ctx.stroke();
    ctx.fillStyle = "#B765B8";
    ctx.fill();
    this.allObjects.forEach(function(object) {
        if (object instanceof AS.Bullet) {
          object.draw(ctx);
        } else {
          ctx.drawImage(
            object.img,
            object.pos[0] - object.imgRadius,
            object.pos[1] - object.imgRadius
          );
        }
    });
  };

  AS.Game.prototype.moveObjects = function() {
    this.allObjects.forEach(function(object){
      object.move();
    });
  };

  AS.Game.prototype.wrap = function(pos) {
    return [(pos[0] + this.DIM_X) % this.DIM_X, (pos[1] + this.DIM_Y) % this.DIM_Y];
  };

  AS.Game.prototype.step = function() {
    for (var b = 0; b < this.bullets.length; b++ ) {
      this.bullets[b].removeBullets();
    }
    this.moveObjects();
    this.ship.slow();


    for (var i = 0; i < this.asteroids.length; i++) {
      if (this.asteroids[i].isCollidedWith(this.ship)) {
        this.gameOver();
      }
      for (var j = 0; j < this.bullets.length; j++) {

          if (this.asteroids[i].isCollidedWith(this.bullets[j])) {
            this.score += 10;
            this.remove(this.asteroids[i]);
            this.remove(this.bullets[j]);
        }
      }
    }

  };

  AS.Game.prototype.remove = function(obj) {
    if (obj instanceof AS.Asteroid) {
      this.asteroids.splice(this.asteroids.indexOf(obj), 1);
    }
    if (obj instanceof AS.Bullet) {
      this.bullets.splice(this.bullets.indexOf(obj), 1);
    }
    this.allObjects.splice(this.allObjects.indexOf(obj), 1);

  };

  AS.Game.prototype.gameOver = function() {
    clearInterval(this.interval);
    // this.draw(ctx);
    var c=document.getElementById("game-canvas");
    var ctx=c.getContext("2d");
    // ctx.fillStyle = "lightgray";
    // ctx.fillRect(this.DIM_X/2 - 100, this.DIM_Y/2 - 100, 200, 200);

    var img = document.createElement('img');
    img.src = 'SMASHtroids-gameover-02.png';
    this.draw(ctx);
    img.onload = function () {
    ctx.drawImage(img,this.DIM_X/2 - 300, this.DIM_Y/2 - 200, 600, 400);
    ctx.fillStyle = "white";
    ctx.font = "italic "+14+"pt Arial ";
    ctx.fillText(this.score, this.DIM_X/2, this.DIM_Y/2 + 40);
  }.bind(this);


    key('enter', function(){
      this.reset();
    }.bind(this));
  };

  AS.Game.prototype.reset = function() {
    this.score = 0;
    this.asteroids = [];
    this.bullets = [];
    this.allObjects = [];
    this.ship = new AS.Ship({pos: [this.DIM_X/2, this.DIM_Y/2], game: this});
    this.addAsteroids();
    this.allObjects.push(this.ship);
  };

}());
