var Client = function (render, controls, network) {
  this.render = render;
  this.controls = controls;
  this.network = network;
};

var Factory = function (render, controls, network) {
  return new Client(render, controls, network);
};

Factory.Constructor = Client;

module.exports = Factory;
