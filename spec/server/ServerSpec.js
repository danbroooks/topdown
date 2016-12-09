'use strict';

describe("Server", function () {

  var sinon = require('sinon');
  var proxyquire = require('proxyquire');

  const hash = () => Math.random().toString(36).substring(11);

  const socket_mock = () => ({ id: hash(), on: sinon.stub(), emit: sinon.stub() });

  var httpMock = {
    createServer: sinon.stub().returns({
      listen: sinon.stub()
    })
  };

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

    it("should bind a socket-io connection via the http object", function () {
      var s = Server();
      expect(socketio.calledWith(s.http)).toBeTruthy();
    });
  });

  describe(".listen(port)", function () {

    beforeEach(function () {
      this.server = Server();
      this.server.connections.add = sinon.stub();
      this.server.http.listen = sinon.stub();
      spyOn(this.server.http, 'listen');
      this.socket = socket_mock();
    });

    afterEach(function () {
      this.server.connections.add.reset();
      this.socket.on.reset();
      this.socket.emit.reset();
    });

    it("should listen on port passed", function () {
      this.server.listen(80);
      expect(this.server.http.listen).toHaveBeenCalledWith(80);
    });

    it("should parse the port argument as an int", function () {
      this.server.listen('8080');
      expect(this.server.http.listen).toHaveBeenCalledWith(8080);
    });

    it("should return server instance", function () {
      var s = this.server.listen(80);
      expect(s).toEqual(this.server);
    });

    it("should bind a new connection event", function () {
      this.server.listen(80);
      expect(this.socketon.calledOnce).toBeTruthy();
      expect(this.socketon.calledWith('connection')).toBeTruthy();
    });

    it('should add connection object passed into the list of connections', function () {
      this.server.listen(80);
      this.server.socket.on.withArgs('connection').yield(this.socket);
      expect(this.server.connections.add.called).toBeTruthy();
    });

    it("should emit 'connected' event", function () {
      this.server.events.emit = sinon.stub();
      this.server.listen(80);
      this.server.socket.on.withArgs('connection').yield(this.socket);
      expect(this.server.events.emit.called).toBeTruthy('events.emit was not called');
      expect(this.server.events.emit.calledWith('connected')).toBeTruthy("events.emit was not called with 'connected' argument");
    });

    it('should remove connection from connection list based on matching id property', function () {

      let connect = (conn) => this.server.socket.on.withArgs('connection').yield(conn)

      this.server.connections.remove = sinon.stub();
      this.server.listen(80);

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

      httpMock.createServer.reset();
    });

    it('should create httpServer with every created server', function () {
      Server();
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
