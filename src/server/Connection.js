var Collection = require('../util/Collection');
var RemoteClient = require('./RemoteClient');

var connections = {};

var Connection = function (socket) {
  this.socket = socket;
  this.id = socket.id;
  this.client = RemoteClient(this);
};

Connection.prototype.on = function (event, handler) {
  this.socket.on(event, handler);
};

Connection.prototype.emit = function (event, data) {
  this.socket.emit(event, data);
};

Connection.prototype.ping = function () {
  var start = Date.now();
  var conn = this;
  conn.emit('ping', function () {
    conn._latency = (Date.now() - start);
  });
};

Connection.prototype.latency = function () {
  this._latency = this._latency || 0;
  return this._latency + 'ms';
};

var Factory = function (socket) {
  var conn = connections[socket.id];

  if (!conn) {
    conn = new Connection(socket);
    connections[socket.id] = conn;
  }

  return conn;
};

Factory.Collection = function () {
  return Collection(function (o) {
    return o instanceof Connection;
  });
};

Factory.Constructor = Connection;

module.exports = Factory;
