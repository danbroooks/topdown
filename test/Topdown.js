'use strict';
// var _ = require('lodash');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { test } = require('ava');

test.beforeEach(t => {
  let server = require('../src/server/Server')();

  let client = {
    on: _ => _
  };

  let game = proxyquire('../src/Topdown', {
    './server/Server': () => server
  });

  server.listen = sinon.spy();

  t.context = { game, server, client };
});

test('`topdown` handles events with `addReducer` and `trigger`', t => {
  let { game } = t.context;

  t.plan(1);

  game.addReducer((state = [], { action, payload }) => {
    switch (action) {
      case 'join':
        let { client } = payload;
        game.trigger('connected', { time: 1481215644041 });
        return state.concat({ id: client.id });
      case 'connected':
        let { time } = payload;
        return state.concat({ time });
      case 'test':
        t.deepEqual(state, [{id: 123}, {time: 1481215644041}]);
        return state;
    }

    return state;
  });

  game.trigger('join', { client: { id: 123 } });
  game.trigger('test');
});

test('`topdown.listen` should call `server.listen`', t => {
  t.plan(1);

  let { game, server } = t.context;
  game.listen(80);
  t.true(server.listen.called);
});

test('`topdown.listen` should pass provided port to `server.listen`', t => {
  t.plan(2);

  let { game, server } = t.context;
  server.setPort = sinon.stub().returns(server);
  game.listen(80);
  t.true(server.setPort.calledWith(80))
  t.true(server.listen.called);
});

test('`topdown.listen` should bind connect and disconnect event listeners', t => {
  let { game, server } = t.context;
  server.on = sinon.spy();
  game.listen(80);
  t.true(server.on.calledTwice);
  t.true(server.on.firstCall.calledWith('connected'))
  t.true(server.on.secondCall.calledWith('disconnected'))
});

test('Fires `join` event when client connects, passes through client & server object', t => {
  t.plan(2);

  let { game, server, client } = t.context;
  let connection = { client };

  game.addReducer((state = [], { action, payload }) => {
    if (action === 'join') {
      t.deepEqual(payload.client, connection.client);
      t.deepEqual(payload.server, server);
    }
  });

  game.listen(80);

  server.events.emit('connected', connection);
});

test('Fires `leave` event when client disconnects, passes through client & server object', t => {
  t.plan(2);

  let { game, server, client } = t.context;
  let connection = { client };

  game.addReducer((state = [], { action, payload }) => {
    if (action === 'leave') {
      t.deepEqual(payload.client, connection.client);
      t.deepEqual(payload.server, server);
    }
  });

  game.listen(80);

  server.events.emit('disconnected', connection);
});
