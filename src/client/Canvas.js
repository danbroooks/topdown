var Build = require('../util/Factory').Build;

var Canvas = function () {};

Canvas.DEFAULT_STROKE = '#FFFFFF';

Canvas.DEFAULT_FILL = '#FFFFFF';

Canvas.prototype.el = undefined;

Canvas.prototype.setWidth = function (val) {
  this.el.width = val;
};

Canvas.prototype.setHeight = function (val) {
  this.el.height = val;
};

Canvas.prototype.ctx = function () {
  return this.el.getContext('2d');
};

Canvas.prototype.setStrokeStyle = function (stroke) {
  this.ctx().strokeStyle = stroke;
};

Canvas.prototype.setFillStyle = function (fill) {
  this.ctx().fillStyle = fill;
};

Canvas.prototype.draw = function (draw) {

  for (var i = 0; i < draw.length; i++) {
    var points = draw[i].points;
    this.renderShape(points, '#FFFFFF', '#FFFFFF');
  }
};

Canvas.prototype.renderShape = function (points, fill, stroke) {

  if (!stroke) {
    stroke = Canvas.DEFAULT_STROKE;
  }

  if (!fill) {
    fill = Canvas.DEFAULT_FILL;
  }

  this.setStrokeStyle(stroke);
  this.setFillStyle(fill);

  var ctx = this.ctx();

  ctx.beginPath();

  for (var j = 0; j < points.length; j++) {
    var pts = points[j];
    var lineTo = j ? ctx.lineTo : ctx.moveTo;
    lineTo.call(ctx, pts[0], pts[1]);
  }

  ctx.closePath();
  ctx.fill();
  ctx.stroke();
};

Canvas.prototype.clear = function () {
  this.ctx().clearRect(0, 0, this.el.width, this.el.height);
};

module.exports = Build(Canvas, function (el) {
  return {
    el: el
  };
});
