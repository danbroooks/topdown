var bind = require('lodash').bind;
var EventEmitter = require('events').EventEmitter;
var Server = require('./server/Server');

var Game = function () {
  this.events = new EventEmitter();
  this.server = Server();
};

Game.prototype.on = function (event, listener) {
  this.events.on(event, bind(listener, this));

  return this;
};

Game.prototype.join = function (connection) {
  this.trigger('join', connection, this.server);
};

Game.prototype.leave = function (connection) {
  this.trigger('leave', connection, this.server);
};

Game.prototype.trigger = function () {
  this.events.emit.apply(this.events, arguments);

  return this;
};

Game.prototype.listen = function (port) {
  this.server.on('connected', this.join.bind(this));
  this.server.on('disconnected', this.leave.bind(this));
  this.server.setPort(port).listen();

  return this;
};

module.exports = new Game();
