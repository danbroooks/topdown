
var _ = require('lodash');

function negativeZero(n) {
  return (n == 0 && (1/n) !== Number.POSITIVE_INFINITY);;
};

var Point = function(x, y) {
  this.x = x;
  this.y = y;
};

Point.prototype.shift = function(x, y){

  if (_.isNumber(x) && _.isNumber(y)) {
    this.x += x;
    this.y += y;
  } else if (x instanceof Point && _.isUndefined(y)) {
    this.x += x.x;
    this.y += x.y;
  } else {
    throw new Error('Invalid arguments passed to point.shift');
  }

  return this;
};

Point.prototype.invert = function(){

  if (this.x !== 0) {
    this.x *= -1;
  }

  if (this.y !== 0) {
    this.y *= -1;
  }

  return this;
};

Point.prototype.rotate = function (axis, degrees) {

  if (_.isUndefined(degrees)) {
    if (!_.isNumber(axis)) {
      throw new Error('Invalid arguments passed to point.rotate');
    }

    degrees = axis;
    axis = Factory(0, 0);
  }

  if (!_.isNumber(degrees)) {
    throw new Error('Invalid arguments passed to point.rotate');
  }

  if (_.isArray(axis)) {
    axis = Factory(axis);
  }

  if (false === axis instanceof Point) {
    throw new Error('Invalid arguments passed to point.rotate');
  }

  var radians = degrees * (Math.PI / 180);

  var cos = Math.cos(radians);
  var sin = Math.sin(radians);

  var transform = {};
  transform.x = (this.x - axis.x);
  transform.y = (this.y - axis.y);

  var rotate = {
    x: transform.x * cos - transform.y * sin,
    y: transform.x * sin + transform.y * cos
  };

  this.x = Number( (rotate.x + axis.x).toFixed(12) );
  this.y = Number( (rotate.y + axis.y).toFixed(12) );
  this.clean();
};

Point.prototype.clean = function() {

  if (negativeZero(this.x)) {
    this.x = 0;
  }

  if (negativeZero(this.y)) {
    this.y = 0;
  }

};

var Factory = function(x, y){

  if (arguments.length > 2) {
    throw new Error('Point was passed invalid arguments');
  }

  if (_.isNumber(x) && _.isUndefined(y)) {
    throw new Error('Point was passed invalid arguments');
  }

  if (!y && _.isArray(x)) {

    if (x.length != 2) {
      throw new Error('Point was passed invalid arguments');
    }

    return new Point(x[0], x[1]);

  } else if (_.isNumber(x) && _.isNumber(y)) {

    return new Point(x, y);

  } else {

    return new Point(0, 0);

  }

};

Factory.Constructor = Point;

Factory.Clone = function(inst) {
  if (inst instanceof Point) {
    return Factory(inst.x, inst.y);
  } else {
    throw new Error('Point.Clone must be passed an instance of Point');
  }
}

Factory.Add = function(a, b) {
  return Factory.Clone(a).shift(b);
};

Factory.Invert = function(point) {
  return Factory.Clone(point).invert();
};

module.exports = Factory;
