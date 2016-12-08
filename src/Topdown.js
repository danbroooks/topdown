'use strict';

const server = require('./server/Server')();

let reducers = [];
let state = [];
let actions = [];

const trigger = (action, payload) => {
  actions = actions.concat({ action, payload });

  if (actions.length === 1) while (actions.length) {
    let a = actions[0];
    state = reducers.reduce((s, reducer) => reducer(s, a), state);
    actions.shift();
  }
};

const listen = (port) => {
  server.on('connected', (connection) => {
    const client = connection.client;

    trigger('join', { client, server });

    client.on('keystream', (keys) => {
      trigger('keystream', { client, keys });
    })
  });

  server.on('disconnected', (connection) => {
    const client = connection.client;
    trigger('leave', { client, server });
  });

  server.listen(port);

  return self;
};

const self = Object.freeze({
  trigger,
  listen,
  addReducer: reducer => reducers = reducers.concat(reducer),
});

module.exports = self;
