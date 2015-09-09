describe("Network", function () {

  var sinon = require('sinon');
  var proxyquire = require('proxyquire');

  var iomock = {};

  iomock.connect = sinon.stub();

  iomock.connect.returns({
    on: sinon.stub()
  });

  var Network = proxyquire('../../src/client/Network', {
    'socket.io-client': iomock
  });

  describe("Factory", function () {
    it("should return new instance", function () {
      expect(Network() instanceof Network.Constructor).toBeTruthy();
    });

    it("should return new instance", function () {
      Network('localhost');
      expect(iomock.connect.calledWith('localhost')).toBeTruthy();
    });
  });

  describe(".on(event, listener)", function () {

    it("should forward on event handler to socket property", function () {
      var n = Network();
      n.socket.on = sinon.stub();
      var handler = function () {};
      n.on('some-event', handler);
      expect(n.socket.on.calledWith('some-event', handler)).toBeTruthy();
    });
  });

});
