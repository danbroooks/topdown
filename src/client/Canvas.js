'use strict';

var Build = require('../util/Factory').Build;

const DEFAULT_STROKE = '#FFFFFF';

const DEFAULT_FILL = '#FFFFFF';

var Canvas = function () {};

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

  this.setStrokeStyle(stroke || DEFAULT_STROKE);
  this.setFillStyle(fill || DEFAULT_FILL);

  var ctx = this.ctx();

  ctx.beginPath();

  for (var j = 0; j < points.length; j++) {
    var pts = points[j];
    (j ? ctx.lineTo : ctx.moveTo).call(ctx, pts[0], pts[1]);
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
