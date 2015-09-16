var bind = require('lodash').bind;
var io = require('socket.io-client');
var Build = require('../util/Factory').Build;

var Network = function () {};

Network.prototype.socket = undefined;

Network.prototype.config = {
  transports: ['websocket'],
  'force new connection': true
};

Network.prototype.connect = function (server) {
  this.socket = io.connect(server, this.config);
  return this;
};

Network.prototype.on = function (event, handler) {
  if (this.socket) {
    this.socket.on(event, bind(handler, this));
  }
  return this;
};

Network.prototype.emit = function (event, data) {
  if (this.socket) {
    this.socket.emit(event, data);
  }
};

var Factory = Build(Network);

module.exports = Factory;
