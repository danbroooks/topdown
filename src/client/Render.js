var Canvas = require('./Canvas');

var Render = function (doc) {
  this.document = doc;
  this.layers = {};
};

Render.prototype.addLayer = function (name) {
  var body = this.document.getElementsByTagName('body')[0];
  var canvas = this.document.createElement('canvas');
  canvas.id = name;
  body.appendChild(canvas);
  this.layers[name] = Canvas(canvas);
};

Render.prototype.getLayer = function (name) {
  return this.layers[name];
};

var Factory = function (doc) {
  return new Render(doc);
};

Factory.Constructor = Render;

module.exports = Factory;
