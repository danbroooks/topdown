describe("Server", function () {

  var sinon = require('sinon');
  var proxyquire = require('proxyquire');

  function hash() {
    return Math.random().toString(36).substring(11);
  }

  function socket_mock() {
    return { id: hash() };
  }

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

    beforeEach(function () {

      httpMock.createServer = sinon.stub();

      httpMock.createServer.returns({
        listen: sinon.stub()
      });

    });

    it("should parse the port argument as an int", function () {
      var s = Server('12');
      expect(s.port).toEqual(12);
    });

    it("should create http server", function () {
      Server(88);
      expect(httpMock.createServer.calledOnce).toBeTruthy();
    });

    it("should bind requestHandler to http", function () {
      var s = Server(88);
      expect(httpMock.createServer.calledWith(s.httpRequestHandler)).toBeTruthy();
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
      this.server.http.listen = sinon.stub();
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
      this.server.onConnected = sinon.stub();
      this.server.listen();
      expect(this.socketon.calledOnce).toBeTruthy();
      expect(this.socketon.calledWith('connection')).toBeTruthy();
      this.socketon.callArg(1);
      expect(this.server.onConnected.called).toBeTruthy();
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

  describe('.onConnected(socket)', function () {

    beforeEach(function () {
      this.server = Server();

      this.server.connections = {
        add: sinon.stub()
      };

      this.socket = socket_mock();
      this.socket.on = sinon.stub();
    });

    afterEach(function () {
      this.server.connections.add.reset();
      this.socket.on.reset();
    });

    it('should add connection object passed into the list of connections', function () {
      this.server.onConnected(this.socket);
      expect(this.server.connections.add.called).toBeTruthy();
    });

    it("should emit 'connected' event", function () {
      this.server.events.emit = sinon.stub();
      this.server.onConnected(this.socket);
      expect(this.server.events.emit.called).toBeTruthy();
    });

    it("should bind socket's disconnect event to 'onDisconnect'", function () {
      this.server.onDisconnect = sinon.stub();

      this.server.onConnected(this.socket);

      expect(this.socket.on.called).toBeTruthy();
      expect(this.socket.on.calledWith('disconnect')).toBeTruthy();

      this.socket.on.yield();

      expect(this.server.onDisconnect.called).toBeTruthy();
    });

  });

  describe('.onDisconnect(socket)', function () {

    beforeEach(function () {
      this.server = Server();
      this.connection = { emit: sinon.stub() };
    });

    it('should call remove on server\'s connection list', function () {
      this.server.connections.remove = sinon.stub();
      this.server.onDisconnect(this.connection);
      expect(this.server.connections.remove.calledOnce).toBeTruthy();
    });

    // @todo: must be a better way of testing this than this test...
    it('should remove connection from connection list based on matching id property', function () {
      var s = this.server;

      var validConn = socket_mock();
      validConn.emit = sinon.stub();

      var invalidConn = socket_mock();
      invalidConn.emit = sinon.stub();

      var trigger = function () {};
       s.connections.remove = function (cb) {
        trigger = function () {
          return cb(validConn);
        };
      };

      s.onDisconnect(invalidConn);
      expect(trigger()).not.toBeTruthy();

      s.onDisconnect(validConn);
      expect(trigger()).toBeTruthy();
    });
  });
});
