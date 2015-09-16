var Build = require('../util/Factory').Build;

var Client = function () {};

Client.prototype.render = undefined;
Client.prototype.controls = undefined;
Client.prototype.network = undefined;

Client.prototype.connect = function (server) {
  this.network.connect(server);
  this.setupControls();
};

Client.prototype.setupControls = function () {
  var network = this.network;
  var controls = this.controls;

  network.on('setControls', function (config) {
    controls.configure(config);
  });

  controls.keystream.onValue(function (val) {
    network.emit('keystream', val);
  });
};

module.exports = Build(Client, function(render, controls, network) {
  var obj = {
    render: render,
    controls: controls,
    network: network
  };
  return obj;
});
