
var sinon = require('sinon');
var proxyquire = require('proxyquire');

var httpMock = {};

var Server = proxyquire('../../src/server/Server', {
  'http': httpMock
});

describe("Server", function() {

  describe("Factory", function () {
    it("should return new instance", function () {
      expect(Server() instanceof Server.Constructor).toBeTruthy();
    });
  });

  describe(".Listen static method", function(){
    it("should listen on the port passed", function(){
      var listen = sinon.stub();
      var createServer = sinon.stub();

      createServer.returns({
        listen: listen
      });

      httpMock.createServer = createServer;

      Server.Listen(8080);

      expect(listen.calledWith(8080)).toBeTruthy();
    });
  });

  describe(".listen(port)", function(){
    it("should listen on port passed", function(){
      var listen = sinon.stub();
      var createServer = sinon.stub();

      createServer.returns({
        listen: listen
      });

      httpMock.createServer = createServer;

      var s = Server(88);
      s.listen();

      expect(listen.calledWith(88)).toBeTruthy();
    });

    it("should return server instance", function() {
      var s = Server(88).listen();
      expect(s instanceof Server.Constructor).toBeTruthy();
    });
  });

});
