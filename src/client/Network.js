var Build = require('../util/Factory').Build;
var io = require('socket.io-client');

var Network = function () {
  this.socket = io.connect(this.server, this.config);
};

Network.prototype.config = {
  transports: ['websocket'],
  'force new connection': true
};

Network.prototype.on = function (event, listener) {
  this.socket.on(event, listener);
};

var Factory = Build(Network, function (server) {
  var opts = {};
  opts.server = server;
  return opts;
});

module.exports = Factory;
