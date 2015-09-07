var Build = require('../util/Factory').Build;

var Collision = function () {};

Collision.prototype.va = undefined;

Collision.prototype.vb = undefined;

var Factory = Build(Collision, function (va, vb) {

  return {
    va: va,
    vb: vb
  };
});

module.exports = Factory;
