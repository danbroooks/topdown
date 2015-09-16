describe("Network", function () {

  var sinon = require('sinon');
  var proxyquire = require('proxyquire');

  var iomock = {};

  iomock.connect = sinon.stub();

  beforeEach(function () {
    this.socketon = sinon.stub();
    this.socketemit = sinon.stub();

    iomock.connect.returns({
      on: this.socketon,
      emit: this.socketemit
    });
  });

  afterEach(function () {
    this.socketon.reset();
    this.socketemit.reset();
  });

  var Network = proxyquire('../../src/client/Network', {
    'socket.io-client': iomock
  });

  describe("Factory", function () {
    it("should return new instance", function () {
      expect(Network() instanceof Network.Constructor).toBeTruthy();
    });
  });

  describe(".connect(server)", function () {
    it("should connect to server passed as argument", function () {
      Network().connect('localhost');
      expect(iomock.connect.calledWith('localhost')).toBeTruthy();
    });

    it("should be chainable", function () {
      var n = Network();
      expect(n.connect('localhost')).toEqual(n);
    });
  });

  describe('.on(event, hander)', function () {

    beforeEach(function () {
      this.network = Network().connect('localhost');
    });

    it("should be chainable", function () {
      expect(this.network.on(null, function () {})).toEqual(this.network);
    });

    it("should forward on events to this.socket", function () {
      var handler = sinon.stub();
      this.network.on('event-name', handler);
      expect(this.socketon.firstCall.args[0]).toEqual('event-name');
      this.socketon.yield();
      expect(handler.called).toBeTruthy();
    });

    it("should not forward if socket is inactive", function () {
      this.network.socket = undefined;
      this.network.on('event-name', null);
      expect(this.socketon.called).not.toBeTruthy();
    });
  });

  describe('.emit(event, data)', function () {

    beforeEach(function () {
      this.network = Network().connect('localhost');
    });

    it("should forward on its arguments to this.socket.emit", function () {
      var event = 'event-name';
      var data = { health: 15 };
      this.network.emit(event, data);
      expect(this.socketemit.firstCall.calledWith(event, data)).toBeTruthy();
    });

    it("should not forward if socket is inactive", function () {
      this.network.socket = undefined;
      this.network.emit('event-name', null);
      expect(this.socketemit.called).not.toBeTruthy();
    });
  });
});
