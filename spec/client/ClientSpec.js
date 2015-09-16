
describe("Client", function () {

  var sinon = require('sinon');
  var Client = require('../../src/client/Client');

  describe("Factory", function () {

    beforeEach(function () {
      this.render = {
        render: undefined
      };
      this.controls = {
        controls: undefined
      };
      this.network = {
        network: undefined
      };
      this.client = Client(this.render, this.controls, this.network);
    });

    it("should return new instance", function () {
      expect(this.client instanceof Client.Constructor).toBeTruthy();
    });

    it("should bind passed in render object as property", function () {
      expect(this.client.render).toEqual(this.render);
    });

    it("should bind passed in controls object as property", function () {
      expect(this.client.controls).toEqual(this.controls);
    });

    it("should bind passed in network object as property", function () {
      expect(this.client.network).toEqual(this.network);
    });
  });

  describe(".connect(server)", function () {
    beforeEach(function () {
      this.network = {};
      this.network.connect = sinon.stub();
      this.cl = Client(null, null, this.network);
      this.cl.setupControls = sinon.stub();
      this.cl.connect('localhost');
    });

    it("should use network object to connect", function () {
      expect(this.network.connect.calledWith('localhost')).toBeTruthy();
    });

    it("should then call event binding functions", function () {
      expect(this.cl.setupControls.calledOnce).toBeTruthy();
    });
  });

  describe(".setupControls()", function () {
    beforeEach(function () {
      this.network = {
        on: sinon.stub(),
        emit: sinon.stub()
      };
      this.controls = {
        configure: sinon.stub(),
        keystream: {
          onValue: sinon.stub()
        }
      };
      var cl = Client(null, this.controls, this.network);
      cl.setupControls();
    });

    it("should listen for a setControls event from server", function () {
      expect(this.network.on.calledWith('setControls')).toBeTruthy();
    });

    it("should pass data to controls when setControls event is received", function () {
      var data = { up: 12 };
      this.network.on.yield(data);
      expect(this.controls.configure.calledWith(data)).toBeTruthy();
    });

    it("should forward controls recieved from controls object over network", function () {
      var keys = [21, 67];
      this.controls.keystream.onValue.yield(keys);
      expect(this.network.emit.calledWith('keystream', keys)).toBeTruthy();
    });
  });
});
