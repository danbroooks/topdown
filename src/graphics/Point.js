'use strict';

var _ = require('lodash');

let negativeZero = (n) => (n == 0 && (1 / n) !== Number.POSITIVE_INFINITY);

let normalise = (n) => {
  return negativeZero(n) ? 0 : n;
};

let self = (x, y) => {

  let invalidArgsError = () => new Error('Point was passed invalid arguments');

  if (_.isNumber(x) && _.isUndefined(y)) {
    throw invalidArgsError();
  }

  if (!y && _.isArray(x)) {
    if (x.length != 2) {
      throw invalidArgsError();
    }

    return self(x[0], x[1]);
  } else if (_.isUndefined(x) && _.isUndefined(y)) {
    return self(0, 0);
  } else if (!self.isValid({ x, y })) {
    throw invalidArgsError();
  }

  x = normalise(x);
  y = normalise(y);

  let shift = (bx, by) => {
    if (_.isNumber(bx) && _.isNumber(by)) {
      return self(x + bx, y + by);
    } else if (self.isValid(bx) && _.isUndefined(by)) {
      return self(x + bx.x, y + bx.y);
    } else {
      throw new Error('Invalid arguments passed to point.shift');
    }
  };

  let invert = () => {

    if (x !== 0) {
      x *= -1;
    }

    if (y !== 0) {
      y *= -1;
    }

    return self(x, y);
  };

  let rotate = (axis, degrees) => {

    if (_.isUndefined(degrees)) {
      if (!_.isNumber(axis)) {
        throw new Error('Invalid arguments passed to point.rotate');
      }

      return rotate(self(0, 0), axis);
    }

    if (!_.isNumber(degrees)) {
      throw new Error('Invalid arguments passed to point.rotate');
    }

    if (_.isArray(axis)) {
      return rotate(self(axis), degrees);
    }

    if (!self.isValid(axis)) {
      throw new Error('Invalid arguments passed to point.rotate');
    }

    var radians = degrees * (Math.PI / 180);

    var cos = Math.cos(radians);
    var sin = Math.sin(radians);

    var transform = {};
    transform.x = (x - axis.x);
    transform.y = (y - axis.y);

    var rotated = {
      x: transform.x * cos - transform.y * sin,
      y: transform.x * sin + transform.y * cos
    };

    return self(
      Number((rotated.x + axis.x).toFixed(12)),
      Number((rotated.y + axis.y).toFixed(12))
    );
  };

  return Object.freeze({
    x,
    y,
    shift,
    invert,
    rotate
  });
};

self.isValid = (point) => _.isObject(point) && _.isNumber(point.x) && _.isNumber(point.y)

module.exports = self;
