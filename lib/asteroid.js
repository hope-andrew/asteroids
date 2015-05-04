(function(){
  window.AS = window.AS || {};

  AS.Asteroid = function(options) {
    var opts = options;
    opts.radius = RAD;
    opts.color = COLOR;
    opts.vel = AS.util.randv(7);
    AS.MovingObject.call(this, opts);
    this.img = new Image();
    this.img.src = 'asteroid2.png';
    this.imgRadius = IMGRADIUS;
  };

  var RAD = AS.Asteroid.RADIUS = 20;
  var COLOR = AS.Asteroid.COLOR = '#808080';
  var IMGRADIUS = AS.Asteroid.IMGRADIUS = 22;
  AS.util.inherits(AS.Asteroid, AS.MovingObject);

}());
