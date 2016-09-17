'use strict';

const DEFAULT_STROKE = '#FFFFFF';
const DEFAULT_FILL = '#FFFFFF';

module.exports = (el) => {
  let ctx = el.getContext('2d');

  let setWidth = width => el.width = width;

  let setHeight = height => el.height = height;

  let renderShape = (points, fill, stroke) => {
    ctx.strokeStyle = stroke || DEFAULT_STROKE;
    ctx.fillStyle = fill || DEFAULT_FILL;

    ctx.beginPath();

    for (var j = 0; j < points.length; j++) {
      var pts = points[j];
      (j ? ctx.lineTo : ctx.moveTo).call(ctx, pts[0], pts[1]);
    }

    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  let clear = () => ctx.clearRect(0, 0, el.width, el.height);

  return Object.freeze({
    setWidth,
    setHeight,
    renderShape,
    clear
  });
};
