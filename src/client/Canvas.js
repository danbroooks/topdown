var Build = require('../util/Factory').Build;

var Canvas = function () {};

Canvas.prototype.el = undefined;

Canvas.prototype.setWidth = function (val) {
  this.el.width = val;
};

Canvas.prototype.setHeight = function (val) {
  this.el.height = val;
};

module.exports = Build(Canvas, function (el) {
  return {
    el: el
  };
});
