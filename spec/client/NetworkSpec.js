describe("Network", function () {

  var sinon = require('sinon');
  var proxyquire = require('proxyquire');

  var iomock = {};

  iomock.connect = sinon.stub();

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

});
