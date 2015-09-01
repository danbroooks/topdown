var Client = function (render, controls) {
  this.render = render;
  this.controls = controls;
};

var Factory = function (render) {
  return new Client(render);
};

Factory.Constructor = Client;

module.exports = Factory;
