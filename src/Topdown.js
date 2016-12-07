'use strict';

let EventEmitter = require('events').EventEmitter;
let _ = require('lodash');

let server = require('./server/Server')();
let events = new EventEmitter();

let on = (event, listener) => {
  events.on(event, listener.bind(self));

  return self;
};

let join = (connection) => {
  trigger('join', connection.client, server);
};

let leave = (connection) => {
  trigger('leave', connection.client, server);
};

let trigger = _.flow(
  events.emit.bind(events),
  () => self
);

let listen = (port) => {
  server.on('connected', join.bind(self));
  server.on('disconnected', leave.bind(self));
  server.listen(port);

  return self;
};

let self = Object.freeze({
  on,
  trigger,
  listen,
});

module.exports = self;
