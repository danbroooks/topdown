// Load dependencies

var lib = require('../lib');
var obj = lib.obj;
var is = lib.is;
var Point = require('./Point');






// Constructor

var Constructor = function (x, y) {

  if (!is.set(x)) {
    x = 0;
  }

  if (!is.set(y)) {
    y = 0;
  }

  // Camera position stored as Point
  this.position = Point(x, y);

};





// Declare object literal

var camera = {};





// Return object literal containing position co-ordinates

camera.get = function () {
  return {
    x: this.position.x,
    y: this.position.y
  };
};





// Offsets a value by the X position of camera

camera.modX = function (x) {
  return x - this.position.x;
};





// Offsets a value by the Y position of camera

camera.modY = function (y) {
  return y - this.position.y;
};





// Move camera by a point

camera.move = function (point) {
  this.position.add(point);
};





// Set camera to position of a point

camera.set = function (point) {
  this.position.add(point.sub(this.position));
};





// Offsets a point by camera position, returns new point instance

camera.offset = function (point) {
  return point.add(this.position, true);
};





// Negatively offsets a point by camera position, returns new point instance

camera.noffset = function (point) {
  return point.sub(this.position, true);
};



/*

// Used for tracking an object with camera, disabled for now.

camera.track = function(object) {

   if (is.string(object) && object == 'off') {
     game.onBeforeLoop.remove('camera_track');
   }

  if (object instanceof Actor) {
    game.onBeforeLoop.add('camera_track', function(){
      camera.set(object.shape.centroid().sub(graphics.getCanvasCenter()));
    });
  }

};


*/


// Create definition

var Camera = obj.define(Object, Constructor, camera);





// Export module

module.exports = Camera;
