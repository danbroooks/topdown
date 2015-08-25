
var Server = require('./server/Server');
var EventEmitter = require('events').EventEmitter;
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
  Server.Listen(port);
  return this;
};

var Topdown = Build(Game);

module.exports = Topdown();
