var _ = require('lodash');
var Canvas = require('./Canvas');

var Render = function (doc) {
  this.document = doc;
  this.layers = {};
};

Render.prototype.draw = function (data) {
  this.refresh();

  var canvas = this.getLayer(data.canvas);
  var shapes = data.data;

  for (var i = 0; i < shapes.length; i++) {
    canvas.renderShape(shapes[i].points);
  }
};

Render.prototype.addLayer = function (name) {
  var body = this.document.getElementsByTagName('body')[0];
  var canvas = this.document.createElement('canvas');
  canvas.id = name;
  body.appendChild(canvas);
  this.layers[name] = Canvas(canvas);
};

Render.prototype.refresh = function () {
  var viewport = this.getViewport();
  _.each(this.layers, function (canvas) {
    canvas.setWidth(viewport.width);
    canvas.setHeight(viewport.height);
    canvas.clear();
  });
};

Render.prototype.getViewport = function () {
  var doc = this.document.documentElement;
  var viewport = {};
  viewport.width = doc.clientWidth;
  viewport.height = doc.clientHeight;
  return viewport;
};

Render.prototype.getLayer = function (name) {
  return this.layers[name];
};

var Factory = function (doc) {
  return new Render(doc);
};

Factory.Constructor = Render;

module.exports = Factory;
