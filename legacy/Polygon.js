// Load dependencies

var obj = require('lib').obj;
var is = require('lib').is;

var Shape = require('./Shape.js');
var Point = require('draw').Point;





// Constructor

var Constructor = function (options) {

  var points;
  var position;
  var opts = {};

  function validateRawArray(points) {
    var size = 2;
    points.forEach(function (point) {
      if (point.length != size) throw new Error('Array contains incorrect number of values to make a point (' + size + ').');
    });
    return true;
  }

  function arrayOfPoints(points) {
    var allPoints = true;
    points.forEach(function (point) {
      var isPoint = point instanceof Point;
      if (allPoints && !isPoint) {
        allPoints = false;
      }
    });
    return allPoints;
  }

  if (is.Array(options)) {
    points = options;
  } else if (is.set(options.points)) {
    points = options.points;
  }

  if (is.Array(points)) {
    var tmp;
    if (!arrayOfPoints(points)) {
      validateRawArray(points);
      tmp = [];
      points.forEach(function (opt) {
        tmp.push(Point(opt));
      });
    } else {
      tmp = points;
    }

    opts.points = tmp;
  }

  // TODO: convert options.position to Point object if array of 2 values

  options = obj.extend({
    points: [
      Point(20, 20),
      Point(20, 40),
      Point(40, 40),
      Point(40, 20)
    ]
  }, options, opts);

  this.points = options.points;

  options = obj.extend({
    position: this.centroid()
  }, options, opts);

  var pos = options.position;

  if (is.Array(pos)) {
    pos = Point(pos);
  }

  this.move(this.centroid().invert());
  this.move(pos);

  this.position = this.centroid();

};





// Declare object literal

var polygon = {};





// Calls graphics method to render shape

polygon.render = function (gfx) {
  gfx.getCanvas().draw(this.points);
};





// Iterates over points to move them by vector supplied in argument

polygon.move = function () {
  var args = arguments;
  var vector;

  if (!args.length || args.length > 2) {
    return false;
  } else if (args[0] instanceof Point) {
    vector = args[0];
  } else if (args.length == 2) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return false;
    }
    vector = Point(args[0], args[1]);
  }

  if (false === vector instanceof Point) {
    throw new Error('You can only move a point by the vector of another Point.');
  }

  this.points.forEach(function (point) {
    point.add(vector);
  });

  this.position = this.centroid();
};





// TODO: basically just alias of move ?

polygon.teleport = function (x, y) {
  var point;

  if (x instanceof Point) {
    point = x;
  } else {
    point = Point(x, y);
  }

  var current = this.centroid();
  this.move(point.sub(current));
};





// Iterates over points to rotate them by angle supplied in argument

polygon.rotate = function (theta) {
  var axis = this.position;

  this.points.forEach(function (point) {
    point.rotate(axis, theta);
  });

  angle = (this.angle + theta) % (Math.PI * 2);

  while (angle < 0) angle += (Math.PI * 2);

  this.angle = angle;
};





//

polygon.setAngle = function (angle) {
  /*
  var axis = this.position;
  var theta = angle - this.angle;

  this.points.forEach(function(point){
    point.rotate(axis, theta);
  });

  this.angle = angle;
  */
};





// Move into collision module?

polygon.containsPoint = function (point) {
  return false;
};

polygon.pointInPolygon = polygon.containsPoint;





//

polygon.detectCollision = function () {

  // TODO: re-write using Collision object
  /*
  var args = arguments;

  if(args.length != 2) {
    throw new Error('Invalid number of arguments provided.');
  } else if ( !args[0] instanceof Point || !args[1] instanceof Point ) {
    throw new Error('Function requires two points to detect collision.');
  }

  var
  B1 = args[0],
  B2 = args[1],
  collision = false,
  points = this.points;

  if (this.pointInPolygon(B1) || this.pointInPolygon(B2)) {
    return true;
  }

  for(var i = 0, nPts = points.length; i < nPts; i++) {
    var this_point = points[i];
    var next_point = points[(i+1)%nPts];

    var A1 = {
      x: this_point.x,
      y: this_point.y
    },
    A2 = {
      x: next_point.x,
      y: next_point.y
    };

    collision = ( collision || this.doesLineIntersect(A1, A2, B1, B2) );
  }

  return collision;
  */
};





// Returns the center point of shape.

polygon.centroid = function () {

  var pts = this.points;
  var nPts = pts.length;


  if (nPts < 3) {
    // TODO: doesnt calculate with only two points (ie straight line)
    throw Error('Centroid for two point shape not implemented yet.');
  } else {
    var x = 0;
    var y = 0;
    var j = nPts - 1;
    var f, p1, p2;

    for (var i = 0; i < nPts; j = i++) {
      p1 = pts[i];
      p2 = pts[j];
      f = p1.x * p2.y - p2.x * p1.y;
      x += (p1.x + p2.x) * f;
      y += (p1.y + p2.y) * f;
    }

    f = this.area() * 6;

    return Point([x / f, y / f]);
  }
};





// Returns area of shape

polygon.area = function () {
  var p1, p2;
  var area = 0;
  var pts = this.points;

  for (var i = 0, nPts = pts.length, j = nPts - 1; i < nPts; j = i++) {
    p1 = pts[i];
    p2 = pts[j];
    area += p1.x * p2.y;
    area -= p1.y * p2.x;
  }

  area /= 2;

  return area;
};





// Object definition

var Polygon = obj.define(Shape, Constructor, polygon);





// Expose to other internal modules

module.exports = Polygon;
