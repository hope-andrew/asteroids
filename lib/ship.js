(function(){
   window.AS = window.AS || {};
   AS.Ship = function(options) {
     var opts = options;
     opts.color = AS.Ship.COLOR;
     opts.radius = AS.Ship.RADIUS;
     opts.vel = [0,0];
     AS.MovingObject.call(this, opts);
     this.img = new Image();
     this.img.src = 'ship.png';
     this.imgRadius = AS.Ship.IMGRADIUS;
   };
   AS.util.inherits(AS.Ship, AS.MovingObject);
   AS.Ship.COLOR = "#000099";
   AS.Ship.RADIUS = 10;
   AS.Ship.IMGRADIUS = 20;

   AS.Ship.prototype.thrust = function(impulse) {
     if ((impulse[0] && this.vel[0] > 20) || (impulse[1] && this.vel[1]) > 20 ) {
       return;
     }
     if ((impulse[0] && this.vel[0] < -20) || (impulse[1] && this.vel[1]) < -20 ) {
       return;
     }
     this.vel = AS.util.addVec(this.vel, impulse);
   };

   AS.Ship.prototype.fire = function() {
     if ((-0.2 <= this.vel[0] && this.vel[0] <= 0.2 ) &&
        (-0.2 <= this.vel[1] && this.vel[1] <= 0.2) ) {
      return;
    }
     this.game.addBullets({pos: this.pos, vel: AS.util.scale(this.vel, 1.5), game: this.game});
   };

   AS.Ship.prototype.slow = function() {
       if (this.vel[0] !== 0 ) {
          var new_vx = (this.vel[0] < 0 ) ? this.vel[0] + 0.1 : this.vel[0] - 0.1;
         this.vel[0] = Math.floor(new_vx * 100 ) / 100;
       }

       if (this.vel[1] !== 0) {
         var new_vy = (this.vel[1] < 0 ) ? this.vel[1] + 0.05 : this.vel[1] - 0.05;
         this.vel[1] = Math.floor(new_vy * 1000 ) / 1000;
       }
   };

}());
