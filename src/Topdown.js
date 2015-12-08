var bind = require('lodash').bind;
var EventEmitter = require('events').EventEmitter;
var Server = require('./server/Server');
var Build = require('./util/Factory').Build;

var Game = function () {
  this.events = new EventEmitter();
  this.server = Server();
};

Game.prototype.on = function (event, listener) {
  var params = event.split(':');

  if (params.length == 1) {
    this.events.on(params[0], bind(listener, this));
  } else if (params.length == 2) {
    this.forward(params[0], params[1], listener);
  }

  return this;
};

Game.prototype.forward = function (to, event, listener) {
  if (to == 'server') {
    return this.server.on(event, listener);
  }
};

Game.prototype.trigger = function (event, payload) {
  this.events.emit(event, payload);
  return this;
};

Game.prototype.listen = function (port) {
  this.server.setPort(port).listen();
  return this;
};

var Topdown = Build(Game);

module.exports = Topdown();
