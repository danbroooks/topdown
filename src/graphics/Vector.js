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

  return Object.freeze({ angle, length });
};
