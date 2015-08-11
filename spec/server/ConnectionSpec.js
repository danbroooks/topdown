var sinon = require('sinon');

describe("Connection", function() {

  var Connection = require('../../src/server/Connection');

  describe("Factory", function () {

    it("should return new instance", function () {
      expect(Connection() instanceof Connection.Constructor).toBeTruthy();
    });

    it("should provide static method for generating collection of connections", function(){
      var col = Connection.Collection();
      col.add(Connection());
      col.add("Connection");
      expect(col.length).toEqual(1);
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
});
