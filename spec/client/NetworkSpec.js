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

    it("should return new instance", function () {
      Network('localhost');
      expect(iomock.connect.calledWith('localhost')).toBeTruthy();
    });
  });

  describe('.on(event, hander)', function () {

    it("should be chainable", function () {
      var n = Network();
      expect(n.on(null, function () {})).toEqual(n);
    });

    it("should forward on events to this.socket", function () {
      var handler = sinon.stub();
      Network().on('event-name', handler);
      expect(this.socketon.firstCall.args[0]).toEqual('event-name');
      this.socketon.yield();
      expect(handler.called).toBeTruthy();
    });
  });

  describe('.emit(event, data)', function () {

    it("should forward on its arguments to this.socket.emit", function () {
      var event = 'event-name';
      var data = { health: 15 };
      Network().emit(event, data);
      expect(this.socketemit.firstCall.calledWith(event, data)).toBeTruthy();
    });
  });
});
