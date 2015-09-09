var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var Server = require('./server/Server');
var RemoteClient = require('./server/RemoteClient');
var Build = require('./util/Factory').Build;

var Game = function () {
  this.events = new EventEmitter();
};

Game.prototype.on = function (event, listener) {
  this.events.on(event, listener);
  return this;
};

Game.prototype.trigger = function (event) {
  this.events.emit(event);
  return this;
};

Game.prototype.listen = function (port) {
  var server = Server.Listen(port);
  _.mapKeys(this.events._events, function (listener, event) {
    server.on(event, function (socket) {
      var cl = RemoteClient(socket);
      listener(cl);
    });
  });
  return this;
};

var Topdown = Build(Game);

module.exports = Topdown();
