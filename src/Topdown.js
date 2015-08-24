
var EventEmitter = require('events').EventEmitter;
var Build = require('./util/Factory').Build;

var Game = function () {
  this.events = new EventEmitter();
};

Game.prototype.on = function (event, listener) {
  this.events.on(event, listener);
};

Game.prototype.trigger = function (event) {
  return this.events.emit(event);
};

var Topdown = Build(Game);

module.exports = Topdown();
