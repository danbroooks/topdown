
var Render = function(doc){
  this.document = doc;
};

var Factory = function(doc){
  return new Render(doc);
};

Factory.Constructor = Render;

module.exports = Factory;

