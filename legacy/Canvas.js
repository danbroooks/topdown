// Load dependencies

var obj = require('lib').obj;
var DOM = require('lib').dom;
var Point = require('draw').Point;
var Polygon = require('./Polygon.js');
var Camera = require('../draw').Camera;
var Collision = require('./Collision.js');





// Constructor

var Constructor = function (id) {
  var selector = 'canvas#' + id;
  this.canvas = DOM.make(selector);
};





// Declare object literal

var canvas = {};





//

canvas.camera = undefined;





//

canvas.useCamera = function (camera) {
  if (camera instanceof Camera) {
    this.camera = camera;
  }
};

canvas.setCamera = canvas.useCamera;






//

canvas.cling = function () {
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
};





//

canvas.clearContext = function () {
  var canvas = this.canvas;
  var ctx = this.getContext();
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
};

canvas.clear = canvas.clearContext;




//

canvas.getContext = function () {
  return this.canvas.getContext('2d');
};





//

canvas.getCanvasSize = function () {
  var canvas = this.canvas;

  return {
    w: canvas.width,
    h: canvas.height,

    width: canvas.width,
    height: canvas.height
  };
};





// Creates a polygon to represent canvas

canvas.asShape = function () {
  var size = this.getCanvasSize();
  var shape = Polygon({
    points: [
      [0, 0],
      [0, size.w],
      [size.h, size.w],
      [size.h, 0]
    ],
    position: [size.w / 2, size.h / 2]
  });

  return shape;
};






//

canvas.getCanvasCenter = function () {
  var size = this.getCanvasSize();
  return Point([size.x / 2, size.y / 2]);
};





//

canvas.text = function (text, position) {
  var ctx = this.getContext();
  if (ctx) {
    ctx.fillStyle = 'FFFFFF';
    ctx.fillText(text, position.x - 25, position.y + 5);
  }
};





// draw

canvas.drawPoints = function (points, fill, stroke) {

  // add check for 'points' containing all points?

  if (!this.pointsInShot(points)) return false;

  fill = fill || '#FFFFFF';
  stroke = stroke || '#FFFFFF';

  var ctx = this.getContext();
  var cam = this.camera;

  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.beginPath();

  for (i = 0; i < points.length; i++) {
    var point = points[i];
    var func = i ? 'lineTo' : 'moveTo';
    ctx[func](cam.modX(point.x), cam.modY(point.y));
  }

  ctx.closePath();
  ctx.fill();
  ctx.stroke();

};

canvas.draw = canvas.drawPoints;



// Iterates over points. If at least one of a shape's points are in shot, then draw.
// If they're all less than 0 or greater than canvas edge on x or y axis, do not draw.

// TODO: re-write with 'shapes overlap' algorythm.

canvas.pointsInShot = function (points) {
  var shape = this.asShape();
  // shape.move(this.camera.position);

  /*
  Collision.areaContainsPoint

  var canvas_size = this.getCanvasSize();
  var cam = this.camera;

  var viewport = {
    x:{
      lt: true, gt: true,
      min: cam.modX(0),
      max: cam.modX(canvas_size.w)
    },
    y: {
      lt: true, gt: true,
      min: cam.modY(0),
      max: cam.modY(canvas_size.h)
    }
  };

  for (var i = 0; i < points.length; i++) {
    var point = points[i];

    if(this.inShot(point)) return true;

    viewport.x.lt = ( viewport.x.lt && (point.x < viewport.x.min) ) ? true : false;
    viewport.x.gt = ( viewport.x.gt && (point.x > viewport.x.max) ) ? true : false;
    viewport.y.lt = ( viewport.y.lt && (point.y < viewport.y.min) ) ? true : false;
    viewport.y.gt = ( viewport.y.gt && (point.y > viewport.y.max) ) ? true : false;
  }

  if (viewport.x.lt || viewport.y.lt || viewport.x.gt || viewport.y.gt) return false;

  // consider case when points are off shot but shape is not

  // More complex tests arise when a shape's points are out of the bounds
  // of camera, but part of the shape will still fall in shot, ie a rotated
  // square or a triangle.

  //   denom = ((LineB2.Y – LineB1.Y) * (LineA2.X – LineA1.X)) –
  //     ((LineB2.X – lineB1.X) * (LineA2.Y - LineA1.Y))
  //   return denom != 0

  // alternatively generate bounding sphere and use that to calculate wether
  // or not to draw shape, less exact but possibly more efficient.

  // http://devmag.org.za/2009/04/13/basic-collision-detection-in-2d-part-1/

  // see also:
  //   https://github.com/robhawkes/rawkets/blob/master/public/js/Game.js#L440

  // Without a final algorithm it's worth rendering this
  // content anyway incase it overlaps into the viewport.
  */
  return true;
};





canvas.inShot = function (point) {

  var canvasSize = this.getCanvasSize();
  var cam = this.camera;

  var pt = cam.noffset(point);

  var withinX = (pt.x > 0 && pt.x < canvasSize.w);
  var withinY = (pt.y > 0 && pt.y < canvasSize.h);

  return (withinX && withinY);
};





// Create definition

var Canvas = obj.define(Object, Constructor, canvas);





// Export module

module.exports = Canvas;
