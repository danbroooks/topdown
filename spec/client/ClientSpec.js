describe("Client", function () {

  var sinon = require('sinon');
  var Client = require('../../src/client/Client');

  beforeEach(function () {
    this.render = sinon.mock({
      refresh: () => {},
      getLayer: () => {},
      addLayer: () => {},
      draw: () => {},
    });
    
    this.controls = sinon.mock({
      configure: () => {},
      keystream: {
        onValue: () => {}
      }
    });

    this.network = {
      connect: sinon.spy(),
      on: sinon.spy(),
      emit: sinon.spy()
    };

    this.client = Client(
      this.render.object, 
      this.controls.object,
      this.network
    );
  });

  describe(".connect(http)", function () {
    it("should use network object to connect", function () {
      this.client.connect('localhost');
      expect(this.network.connect.withArgs('localhost').calledOnce)
        .toBeTruthy();
    });

    it("should listen for an addCanvas event from server", function () {
      this.client.connect('localhost');
      expect(this.network.on.withArgs('addCanvas').calledOnce)
        .toBeTruthy();
    });

    it("should listen for a render event from server", function () {
      this.client.connect('localhost');
      expect(this.network.on.withArgs('render').calledOnce)
        .toBeTruthy();
    });

    it("should listen for a setControls event from server", function () {
      this.client.connect('localhost');
      expect(this.network.on.withArgs('setControls').calledOnce)
        .toBeTruthy();
    });

    it("should forward addCanvas network data on to render.addLayer", function () {
      var layer = 'foreground';
      this.render.expects('addLayer').withExactArgs(layer);

      this.client.connect('localhost');
      this.network.on.yield(layer);
      this.render.verify();
    });

    it("should forward render network data to render", function () {
      var canvas = 'foreground';
      var data = [12, 12];

      this.render.expects('draw').calledWith({ canvas, data });

      this.client.connect('localhost');

      this.network.on.yield({ canvas, data });
      this.render.verify();
    });

    it("should forward controls received from controls object over network", function () {
      this.controls.object.keystream.onValue = sinon.stub();
      this.client.connect('localhost');

      var keys = [21, 67];
      this.controls.object.keystream.onValue.yield(keys);
      expect(this.network.emit.withArgs('keystream', keys).calledOnce).toBeTruthy();
    });
  });
});
