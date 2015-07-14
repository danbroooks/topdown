
var _ = require('lodash');

var Point = function(x, y) {
  this.x = x;
  this.y = y;
};

module.exports = function(x, y){

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
