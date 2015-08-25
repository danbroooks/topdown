var sinon = require('sinon');

describe("Connection", function() {

  var Connection = require('../../src/server/Connection');

  describe("Factory", function () {

    it("should return new instance", function () {
      expect(Connection(sinon.mock()) instanceof Connection.Constructor).toBeTruthy();
    });

    it("should provide static method for generating collection of connections", function(){
      var col = Connection.Collection();
      col.add(Connection(sinon.mock()));
      col.add("Connection");
      expect(col.length).toEqual(1);
    });

  });

  describe("Constructor", function () {

    it("should bind the socket id to connection's .id property", function () {
      var c = new Connection.Constructor({ id: 100 });
      expect(c.id).toEqual(100);
    });

  });

  describe(".on", function(){

    var conn, onconnect;
    var mock = {};

    beforeEach(function () {
      mock.on = sinon.stub();
      conn = Connection(mock);
      onconnect = function(){};
      conn.on('connect', onconnect);
    });

    afterEach(function () {
      mock.on.reset();
    });

    it("should forward events socket.on", function () {
      expect(mock.on.called).toBeTruthy();
    });

    it("should directly pass arguments to socket.on", function () {
      expect(mock.on.calledWith('connect', onconnect)).toBeTruthy();
    });

  });

  describe(".emit", function(){

    var conn, data;
    var mock = {};

    beforeEach(function () {
      mock.emit = sinon.stub();
      conn = Connection(mock);
      data = {};
      conn.emit('update', data);
    });

    afterEach(function () {
      mock.emit.reset();
    });

    it("should forward events socket.emit", function () {
      expect(mock.emit.called).toBeTruthy();
    });

    it("should directly pass arguments to socket.emit", function () {
      expect(mock.emit.calledWith('update', data)).toBeTruthy();
    });

  });

  describe('.ping', function () {

    beforeEach(function(){
      var clock = this.clock = sinon.useFakeTimers();

      var mock = {};
      mock.emit = function(){};
      sinon.stub(mock, 'emit', function (event, cb) {
        clock.tick(500);
        cb();
      });
      this.conn = Connection(mock);
    });

    afterEach(function(){
      this.clock.restore();
    });

    it("should track latency in the connection", function(){
      var conn = this.conn;
      conn.ping();
      expect(conn._latency).toEqual(500);
    });

  });

  describe('.latency', function () {

    it("should return 0ms if _latency not set", function(){
      var c = Connection({});
      expect(c.latency()).toEqual('0ms');
    });

    it("should return printable latency", function(){
      var c = Connection({});
      c._latency = 200;
      expect(c.latency()).toEqual('200ms');
    });

  });

});
