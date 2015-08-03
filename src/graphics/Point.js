
var _ = require('lodash');

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
