var Build = require('../util/Factory').Build;
var Point = require('./Point');

var Vector = function () {};

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
