'use strict';

describe("Server", function () {

  var sinon = require('sinon');
  var proxyquire = require('proxyquire');

  const hash = () => Math.random().toString(36).substring(11);

  const socket_mock = () => ({ id: hash(), on: sinon.stub(), emit: sinon.stub() });

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

  beforeEach(function () {
    this.socketon = sinon.stub();
    this.socketemit = sinon.stub();

    socketio.returns({
      on: this.socketon,
      emit: this.socketemit
    });
  });

  afterEach(function () {
    this.socketon.reset();
    this.socketemit.reset();
  });

  describe("Constructor", function () {

    it("should parse the port argument as an int", function () {
      var s = Server('12');
      expect(s.port).toEqual(12);
    });

    it("should bind a socket-io connection via the http object", function () {
      var s = Server(88);
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
      this.server.connections.add = sinon.stub();
      this.server.http.listen = sinon.stub();
      this.socket = socket_mock();
    });

    afterEach(function () {
      this.server.connections.add.reset();
      this.socket.on.reset();
      this.socket.emit.reset();
    });

    it("should listen on port passed", function () {
      this.server.listen();
      expect(this.server.http.listen.calledWith(88)).toBeTruthy();
    });

    it("should return server instance", function () {
      var s = this.server.listen();
      expect(s).toEqual(this.server);
    });

    it("should bind a new connection event", function () {
      this.server.listen();
      expect(this.socketon.calledOnce).toBeTruthy();
      expect(this.socketon.calledWith('connection')).toBeTruthy();
    });

    it('should add connection object passed into the list of connections', function () {
      this.server.listen();
      this.server.socket.on.withArgs('connection').yield(this.socket);
      expect(this.server.connections.add.called).toBeTruthy();
    });

    it("should emit 'connected' event", function () {
      this.server.events.emit = sinon.stub();
      this.server.listen();
      this.server.socket.on.withArgs('connection').yield(this.socket);
      expect(this.server.events.emit.called).toBeTruthy('events.emit was not called');
      expect(this.server.events.emit.calledWith('connected')).toBeTruthy("events.emit was not called with 'connected' argument");
    });

    it('should remove connection from connection list based on matching id property', function () {

      let connect = (conn) => this.server.socket.on.withArgs('connection').yield(conn)

      this.server.connections.remove = sinon.stub();
      this.server.listen();

      connect(this.socket);
      connect(socket_mock());
      connect(socket_mock());

      this.socket.on.withArgs('disconnect').yield();

      this.server.connections.each(conn => expect(conn).toNotEqual(this.socket))
    });
  });

  describe(".http", function () {

    beforeEach(function () {

      fsMock.find = sinon.stub();

      this.req = {
        url: '/'
      };

      this.res = {
        writeHead: sinon.stub(),
        end: sinon.stub()
      };

      httpMock.createServer = sinon.stub();

      httpMock.createServer.returns({
        listen: sinon.stub()
      });
    });

    it('should create httpServer with every created server', function () {
      Server(88);
      expect(httpMock.createServer.calledOnce).toBeTruthy();
    });

    it('should call fs.find to search for the file in the file system', function () {
      this.req.url = '/gunship.jpeg';
      Server();
      httpMock.createServer.yield(this.req, this.res);
      expect(fsMock.find.called).toBeTruthy();
      expect(fsMock.find.calledWith('/gunship.jpeg')).toBeTruthy();
    });

    it("should look for index.html when passed '/'", function () {
      this.req.url = '/';
      Server();
      httpMock.createServer.yield(this.req, this.res);
      expect(fsMock.find.calledWith('/index.html')).toBeTruthy();
    });

    it("should serve file when file is found", function () {
      Server();
      httpMock.createServer.yield(this.req, this.res);
      var content = '<h1>Hello</h1>';
      fsMock.find.yieldTo('success', '/index.html', content);
      expect(this.res.writeHead.calledWith(200)).toBeTruthy();
      expect(this.res.end.calledWith(content)).toBeTruthy();
    });

    it("should throw 404 when file is not found", function () {
      Server();
      httpMock.createServer.yield(this.req, this.res);
      fsMock.find.yieldTo('failure');
      expect(this.res.writeHead.calledWith(404)).toBeTruthy();
    });
  });

  describe('.on', function () {

    beforeEach(function () {
      this.server = Server();
    });

    it("on should be chainable", function () {
      expect(this.server.on(null, function () {})).toEqual(this.server);
    });

    it("should bind event listeners to server.events event emitter", function (done) {
      this.server.on('complete', done);

      this.server.events.emit('complete');
    });
  });
});
