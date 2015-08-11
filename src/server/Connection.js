
var Collection = require('../util/Collection');

var Connection = function (socket) {
  this.socket = socket;
};

Connection.prototype.on = function (event, handler) {
  this.socket.on(event, handler);
};

var Factory = function (socket) {
  return new Connection(socket);
};

Factory.Collection = function () {
  return Collection(function (o){
    return o instanceof Connection;
  });
};

Factory.Constructor = Connection;

module.exports = Factory;

