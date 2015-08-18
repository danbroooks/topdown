
var Render = function(doc){
  this.document = doc;
};

Render.prototype.addLayer = function (name) {
  var body = this.document.getElementsByTagName('body')[0];
  var canvas = this.document.createElement('canvas');
  canvas.id = name;
  body.appendChild(canvas);
};

var Factory = function(doc){
  return new Render(doc);
};

Factory.Constructor = Render;

module.exports = Factory;

