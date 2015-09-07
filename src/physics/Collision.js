var Build = require('../util/Factory').Build;
var Vector = require('../graphics/Vector');

var Collision = function () {};

Collision.prototype.va = undefined;

Collision.prototype.vb = undefined;

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
