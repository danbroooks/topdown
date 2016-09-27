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

  let difference = (vector) => ({ x: from.x - vector.from.x, y: from.y - vector.from.y });

  let collision = (vector) => {

    if (!vector) {
      throw new Error('Invalid argument passed to vector.collision(), requires Vector');
    }

    let a1 = from;
    let a2 = to;
    let b1 = vector.from;
    let b2 = vector.to;

    var b2b1X = b2.x - b1.x;
    var b2b1Y = b2.y - b1.y;
    var a2a1X = a2.x - a1.x;
    var a2a1Y = a2.y - a1.y;
    var ab1X = a1.x - b1.x;
    var ab1Y = a1.y - b1.y;

    var u_b = b2b1Y * a2a1X - b2b1X * a2a1Y;
    if (u_b == 0) {
        if ((b2b1X * ab1Y - b2b1Y * ab1X) === 0 ||
            (a2a1X * ab1Y - a2a1Y * ab1X) === 0) {

            if (!(
                a1.x < b1.x && a1.x < b2.x && a2.x < b1.x && a2.x < b2.x ||
                a1.y < b1.y && a1.y < b2.y && a2.y < b1.y && a2.y < b2.y ||
                a1.x > b1.x && a1.x > b2.x && a2.x > b1.x && a2.x > b2.x ||
                a1.y > b1.y && a1.y > b2.y && a2.y > b1.y && a2.y > b2.y
                )) {
                return false;
            }
        }
        return false;
    }

    var ua = (b2b1X * ab1Y - b2b1Y * ab1X) / u_b;
    var ub = (a2a1X * ab1Y - a2a1Y * ab1X) / u_b;

    if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
        return Point(
          a1.x + ua * a2a1X,
          a1.y + ua * a2a1Y
        );
    }

    return false;
  };

  return Object.freeze({ from, to, angle, length, collision });
};
