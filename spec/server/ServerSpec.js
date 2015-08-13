
var sinon = require('sinon');
var proxyquire = require('proxyquire');

var httpMock = {};
var fsMock = {};

var Server = proxyquire('../../src/server/Server', {
  'http': httpMock,
  './FileSystem': function() {
    return fsMock;
  }
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

    it("should create http server", function () {
      this.server.listen();
      expect(httpMock.createServer.calledOnce).toBeTruthy();
    });

    it("should bind requestHandler to http", function () {
      this.server.httpRequestHandler = sinon.stub();

      this.server.listen();
      httpMock.createServer.yield();

      expect(this.server.httpRequestHandler.calledOnce).toBeTruthy();
    });

  });

  describe(".httpRequestHandler(req, res)", function () {

    beforeEach(function () {

      fsMock.find = sinon.stub();

      this.req = {
        url: '/'
      };

      this.res = {
        writeHead: sinon.stub(),
        end: sinon.stub()
      };
    });

    it('should call fs.find to search for the file in the file system', function () {
      this.req.url = '/gunship.jpeg';
      Server().httpRequestHandler(this.req, this.res);
      expect(fsMock.find.called).toBeTruthy();
      expect(fsMock.find.calledWith('/gunship.jpeg')).toBeTruthy();
    });

    it("should look for index.html when passed '/'", function () {
      this.req.url = '/';
      Server().httpRequestHandler(this.req, this.res);
      expect(fsMock.find.calledWith('/index.html')).toBeTruthy();
    });

    it("should serve file when file is found", function () {
      Server().httpRequestHandler(this.req, this.res);
      var content = '<h1>Hello</h1>';
      fsMock.find.yieldTo('success', '/index.html', content);
      expect(this.res.writeHead.calledWith(200)).toBeTruthy();
      expect(this.res.end.calledWith(content)).toBeTruthy();
    });

    it("should throw 404 when file is not found", function () {
      Server().httpRequestHandler(this.req, this.res);
      fsMock.find.yieldTo('failure');
      expect(this.res.writeHead.calledWith(404)).toBeTruthy();
    });

  });

});
