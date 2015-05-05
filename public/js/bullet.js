(function(){
  window.AS = window.AS || {};
  AS.Bullet = function(options) {
    options.radius = AS.Bullet.RADIUS;
    options.color = AS.Bullet.COLOR;
    this.game = options.game;
    AS.MovingObject.call(this,options);
  };

  AS.Bullet.RADIUS = 5;
  AS.Bullet.COLOR = "#F80000";
  AS.util.inherits(AS.Bullet, AS.MovingObject);

  AS.Bullet.prototype.removeBullets = function() {
    if (this.outOfBounds()) {
      this.game.remove(this);
    }
  };

  AS.Bullet.prototype.outOfBounds = function() {
    if (this.pos[0] < 0 || this.pos[0] > this.game.DIM_X) {
      return true;
    }
    if (this.pos[1] < 0 || this.pos[1] > this.game.DIM_Y) {
      return true;
    }
    return false;
  };
}());
