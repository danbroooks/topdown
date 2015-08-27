var Build = require('../util/Factory').Build;
var Point = require('./Point');

var Vector = function () {};

Vector.prototype.from = Point(0, 0);
Vector.prototype.to = Point(0, 0);

/**
 * determine the current angle of the vector
 */
Vector.prototype.angle = function () {
  var dy = this.from.y - this.to.y;
  var dx = this.from.x - this.to.x;
  var theta = Math.atan2(dy, dx) * -1; // calculate angle in radians
  theta *= 180 / Math.PI; // convert rads to degs, range
  return (270 + theta) % 360;
};

/**
 * calculate the length of the vector
 */
Vector.prototype.length = function () {};

var Factory = Build(Vector, function (from, to) {

  if (!Point.Created(from) || !Point.Created(to)) {
    throw new Error('Vector constructor takes two Point objects.');
  }

  return {
    from: from,
    to: to
  };
});

module.exports = Factory;
