'use strict';

let Point = require('./Point');

module.exports = (from, to) => {
  if (!Point.isValid(from) || !Point.isValid(to)) {
    throw new Error('Vector constructor takes two Point objects.');
  }

  let angle = () => {
    let dy = from.y - to.y;
    let dx = from.x - to.x;
    let theta = Math.atan2(dy, dx) * -1; // calculate angle in radians
    theta *= 180 / Math.PI; // convert rads to degs, range
    return (270 + theta) % 360;
  };

  let length = () => {
    let dx = from.x - to.x;
    let dy = from.y - to.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  return Object.freeze({ angle, length });
};
