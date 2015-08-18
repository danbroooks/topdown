
var Client = function (render) {
  this.render = render;
  console.log(this);
};

var Factory = function (render) {
  return new Client(render);
};

Factory.Constructor = Client;

module.exports = Factory;
