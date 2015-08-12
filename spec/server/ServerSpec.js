
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

  describe("Constructor", function () {

    it("should parse the port argument as an int", function () {
      var s = new Server.Constructor('12');
      expect(s.port).toEqual(12);
    });

  });

  describe(".Listen static method", function(){

    it("should listen on the port passed", function(){

      var listen = sinon.stub();

      httpMock.createServer = sinon.stub();

      httpMock.createServer.returns({
        listen: listen
      });

      Server.Listen(8080);
      expect(listen.calledWith(8080)).toBeTruthy();
    });
  });

  describe(".listen(port)", function () {

    beforeEach(function () {

      var listen = this.httpListen = sinon.stub();

      httpMock.createServer = sinon.stub();

      httpMock.createServer.returns({
        listen: listen
      });

      this.server = Server(88);
    });

    it("should listen on port passed", function () {
      this.server.listen();
      expect(this.httpListen.calledWith(88)).toBeTruthy();
    });

    it("should return server instance", function () {
      var s = this.server.listen();
      expect(s instanceof Server.Constructor).toBeTruthy();
    });

  });

});
