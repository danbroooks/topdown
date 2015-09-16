var bind = require('lodash').bind;
var io = require('socket.io-client');
var Build = require('../util/Factory').Build;

var Network = function () {
  this.socket = io.connect(this.server, this.config);
};

Network.prototype.config = {
  transports: ['websocket'],
  'force new connection': true
};

Network.prototype.on = function (event, handler) {
  this.socket.on(event, bind(handler, this));
  return this;
};

var Factory = Build(Network, function (server) {
  var opts = {};
  opts.server = server;
  return opts;
});

module.exports = Factory;
