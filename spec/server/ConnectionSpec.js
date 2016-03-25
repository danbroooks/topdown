describe("Connection", function () {

  var sinon = require('sinon');
  var Connection = require('../../src/server/Connection');

  function hash() {
    return Math.random().toString(36).substring(11);
  }

  function socket_mock() {
    return { id: hash() };
  }

  describe("Factory", function () {

    it("should return new instance", function () {
      expect(Connection(sinon.mock()) instanceof Connection.Constructor).toBeTruthy();
    });

    it("should provide static method for generating collection of connections", function () {
      var col = Connection.Collection();
      col.add(Connection(sinon.mock()));
      col.add("Connection");
      expect(col.length).toEqual(1);
    });

    it("should return same instance of connection when same socket passed in to constructor", function () {
      var socket = socket_mock();
      expect(Connection(socket) === Connection(socket)).toBeTruthy();
    });

  });

  describe("Constructor", function () {

    it("should bind the socket id to connection's .id property", function () {
      var c = new Connection.Constructor({
        id: 100
      });
      expect(c.id).toEqual(100);
    });

  });

  describe(".on", function () {

    beforeEach(function () {
      var mock = socket_mock();
      mock.on = sinon.stub();
      var conn = Connection(mock);
      function onconnect() {};
      conn.on('connect', onconnect);

      this.mock = mock;
      this.onconnect = onconnect;
    });

    afterEach(function () {
      this.mock.on.reset();
    });

    it("should forward events socket.on", function () {
      expect(this.mock.on.called).toBeTruthy();
    });

    it("should directly pass arguments to socket.on", function () {
      expect(this.mock.on.calledWith('connect', this.onconnect)).toBeTruthy();
    });

  });

  describe(".emit", function () {

    beforeEach(function () {
      var mock = socket_mock();
      mock.emit = sinon.stub();
      var conn = Connection(mock);
      data = { a: 12 };
      conn.emit('update', data);

      this.conn = conn;
      this.mock = mock;
      this.data = data;
    });

    afterEach(function () {
      this.mock.emit.reset();
    });

    it("should forward events socket.emit", function () {
      expect(this.mock.emit.called).toBeTruthy();
    });

    it("should directly pass arguments to socket.emit", function () {
      expect(this.mock.emit.calledWith('update', this.data)).toBeTruthy();
    });

  });

  describe('.ping', function () {

    beforeEach(function () {
      var clock = this.clock = sinon.useFakeTimers();

      var mock = socket_mock();
      mock.emit = function () {};
      sinon.stub(mock, 'emit', function (event, cb) {
        clock.tick(500);
        cb();
      });
      this.conn = Connection(mock);
    });

    afterEach(function () {
      this.clock.restore();
    });

    it("should track latency in the connection", function () {
      var conn = this.conn;
      conn.ping();
      expect(conn._latency).toEqual(500);
    });

  });

  describe('.latency', function () {

    it("should return 0ms if _latency not set", function () {
      var c = Connection(socket_mock());
      expect(c.latency()).toEqual('0ms');
    });

    it("should return printable latency", function () {
      var c = Connection(socket_mock());
      c._latency = 200;
      expect(c.latency()).toEqual('200ms');
    });

  });

});
