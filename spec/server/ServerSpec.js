describe("Server", function () {

  var sinon = require('sinon');
  var proxyquire = require('proxyquire');

  var httpMock = {};
  var fsMock = {};

  var socketio = sinon.stub();
  var ConnectionMock = sinon.stub();
  ConnectionMock.Collection = sinon.stub();

  var Server = proxyquire('../../src/server/Server', {
    'http': httpMock,
    'socket.io': socketio,
    './FileSystem': function () {
      return fsMock;
    },
    './Connection': ConnectionMock
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
    ConnectionMock.reset();
    ConnectionMock.Collection.reset();
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

  describe('.on(event, hander)', function () {

    it("should be chainable", function () {
      var s = Server();
      expect(s.on(null, function () {})).toEqual(s);
    });

    it("should forward on events to this.socket", function () {
      var handler = sinon.stub();
      Server().on('event-name', handler);
      expect(this.socketon.firstCall.args[0]).toEqual('event-name');
      this.socketon.yield({
        id: 'abc'
      });
      expect(handler.called).toBeTruthy();
    });
  });

  describe('.emit(event, data)', function () {
    it("should forward on its arguments to this.socket.emit", function () {
      var event = 'event-name';
      var data = { health: 15 };
      Server().emit(event, data);
      expect(this.socketemit.firstCall.calledWith(event, data)).toBeTruthy();
    });
  });

  describe('.onConnected(socket)', function () {

    beforeEach(function () {
      this.connection = {
        on: sinon.stub(),
        emit: sinon.stub(),
      };

      var connection_add = sinon.stub();
      ConnectionMock.Collection.returns({
        add: connection_add
      });
      this.connection_add = connection_add;
    });

    it('should add connection object passed into the list of connections', function () {
      var connection = this.connection;
      Server().onConnected(connection);
      expect(this.connection_add.calledWith(connection)).toBeTruthy();
    });

    it('should bind disconnect event to new connection', function () {
      var s = Server();
      s.onDisconnect = sinon.stub();
      s.onConnected(this.connection);
      expect(this.connection.on.called).toBeTruthy();
      expect(this.connection.on.calledWith('disconnect')).toBeTruthy();
      this.connection.on.callArg(1);
      expect(s.onDisconnect.called).toBeTruthy();
    });

  });

  describe('.onDisconnect(socket)', function () {

    it('should call remove on server\'s connection list', function () {
      var s = Server();
      s.connections.remove = sinon.stub();
      s.onDisconnect();
      expect(s.connections.remove.calledOnce).toBeTruthy();
    });

    // @todo: must be a better way of testing this than this test...
    it('should remove connection from connection list based on matching id property', function () {
      var s = Server();
      var validConn = {
        id: 12345
      };
      var invalidConn = {
        id: 54321
      };
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
