'use strict';

let Point = require('./Point');

module.exports = (from, to) => {
  if (!Point.isValid(from) || !Point.isValid(to)) {
    throw new Error('Vector constructor takes two Point objects.');
  }

  let diff = () => ({ x: (from.x - to.x), y: (from.y - to.y) });

  let to_degrees = (rad) => rad * (180 / Math.PI);

  let angle = () => {
    let d = diff();
    return (270 + to_degrees(Math.atan2(d.y, d.x) * -1)) % 360;
  }

  let length = () => {
    let d = diff();
    return Math.sqrt(d.x * d.x + d.y * d.y);
  };

  let collision = (vector) => {

    var s1_x, s1_y, s2_x, s2_y;

    s1_x = to.x - from.x;
    s1_y = to.y - from.y;
    s2_x = vector.to.x - vector.from.x;
    s2_y = vector.to.y - vector.from.y;

    var s = (-s1_y * (from.x - vector.from.x) + s1_x * (from.y - vector.from.y)) / (-s2_x * s1_y + s1_x * s2_y);
    var t = (s2_x * (from.y - vector.from.y) - s2_y * (from.x - vector.from.x)) / (-s2_x * s1_y + s1_x * s2_y);

    if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
      // Collision detected
      return Point({
        x: from.x + (t * s1_x),
        y: from.y + (t * s1_y)
      });
    }

    // No collision
    return false;
  };

  return Object.freeze({ angle, length, collision, from, to });
};
