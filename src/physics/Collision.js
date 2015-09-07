var Build = require('../util/Factory').Build;
var Point = require('../graphics/Point');
var Vector = require('../graphics/Vector');

var Collision = function () {};

Collision.prototype.va = undefined;

Collision.prototype.vb = undefined;

Collision.prototype.getIntersectionPoint = function () {

  var vectorA = this.va;
  var vectorB = this.vb;

  var s1_x, s1_y, s2_x, s2_y;

  s1_x = vectorA.to.x - vectorA.from.x;
  s1_y = vectorA.to.y - vectorA.from.y;
  s2_x = vectorB.to.x - vectorB.from.x;
  s2_y = vectorB.to.y - vectorB.from.y;

  var s = (-s1_y * (vectorA.from.x - vectorB.from.x) + s1_x * (vectorA.from.y - vectorB.from.y)) / (-s2_x * s1_y + s1_x * s2_y);
  var t = (s2_x * (vectorA.from.y - vectorB.from.y) - s2_y * (vectorA.from.x - vectorB.from.x)) / (-s2_x * s1_y + s1_x * s2_y);

  if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
    // Collision detected
    return Point({
      x: vectorA.from.x + (t * s1_x),
      y: vectorA.from.y + (t * s1_y)
    });
  }

  // No collision
  return false;
};

var Factory = Build(Collision, function (va, vb) {
  if (!Vector.Created(va) || !Vector.Created(vb)) {
    throw new Error('Invalid arguments passed to Collision, requires two Vectors');
  }

  return {
    va: va,
    vb: vb
  };
});

module.exports = Factory;
