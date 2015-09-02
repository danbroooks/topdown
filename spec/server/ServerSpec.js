describe("Server", function () {

  var sinon = require('sinon');
  var proxyquire = require('proxyquire');

  var httpMock = {};
  var fsMock = {};
  var socketio = sinon.stub();

  var Server = proxyquire('../../src/server/Server', {
    'http': httpMock,
    'socket.io': socketio,
    './FileSystem': function () {
      return fsMock;
    }
  });

  describe("Factory", function () {

    it("should return new instance", function () {
      expect(Server() instanceof Server.Constructor).toBeTruthy();
    });

  });

  describe("Constructor", function () {

    beforeEach(function () {

      httpMock.createServer = sinon.stub();

      httpMock.createServer.returns({
        listen: sinon.stub()
      });

    });

    it("should parse the port argument as an int", function () {
      var s = new Server.Constructor('12');
      expect(s.port).toEqual(12);
    });

    it("should create http server", function () {
      new Server.Constructor(88);
      expect(httpMock.createServer.calledOnce).toBeTruthy();
    });

    it("should bind requestHandler to http", function () {
      var s = new Server.Constructor(88);
      expect(httpMock.createServer.calledWith(s.httpRequestHandler)).toBeTruthy();
    });

    it("should bind a socket-io connection via the http object", function () {
      var s = new Server.Constructor(88);
      expect(socketio.calledWith(s.http)).toBeTruthy();
    });
  });

  describe(".Listen static method", function () {

    it("should listen on the port passed", function () {

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
      this.server = Server(88);
      this.server.http.listen = sinon.stub();
    });

    it("should listen on port passed", function () {
      this.server.listen();
      expect(this.server.http.listen.calledWith(88)).toBeTruthy();
    });

    it("should return server instance", function () {
      var s = this.server.listen();
      expect(s instanceof Server.Constructor).toBeTruthy();
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

  describe('.on(event, hander)', function () {

    beforeEach(function(){
      this.socketon = sinon.stub();
      socketio.returns({
        on: this.socketon
      });
    });

    it("should be chainable", function () {
      var s = Server();
      expect(s.on(null, function(){})).toEqual(s);
    });


    it("should forward on events to this.socket", function () {
      var handler = sinon.stub();
      Server().on('event-name', handler);
      expect(this.socketon.firstCall.args[0]).toEqual('event-name');
      this.socketon.yield();
      expect(handler.called).toBeTruthy();
    });
  });

});
