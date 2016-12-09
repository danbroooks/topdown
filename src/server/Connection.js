'use strict';

const Collection = require('../util/Collection');
const RemoteClient = require('./RemoteClient');

let connections = {};

const Factory = (socket) => {
  const id = socket.id;

  let conn = connections[id];

  if (conn) return conn;

  const client = RemoteClient(socket);

  const on = (event, handler) => socket.on(event, handler);

  const emit = (event, data) => socket.emit(event, data);

  const ping = (cb) => {
    const start = Date.now();
    emit('ping', () => cb(Date.now() - start));
  };

  conn = Object.freeze({ id, on, emit, client, ping });

  connections[id] = conn;

  return conn;
};

Factory.Collection = () => Collection(_ => (connections[_.id]));

module.exports = Factory;
