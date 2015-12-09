describe("Render", function () {

  var sinon = require('sinon');
  var proxyquire = require('proxyquire');
  var Render;

  beforeEach(function () {
    var CanvasMock = sinon.stub();

    Render = proxyquire('../../src/client/Render', {
      './Canvas': CanvasMock
    });

    this.CanvasMock = CanvasMock;
  });

  describe("Factory", function () {
    it("should return new instance", function () {
      expect(Render() instanceof Render.Constructor).toBeTruthy();
    });

    it("should store passed document object", function () {
      var doc = {};
      expect(Render(doc).document).toEqual(doc);
    });

    it("should create a layers object to track active canvas layers", function () {
      expect(Render().layers).toEqual(jasmine.any(Object));
    });
  });

  describe(".addLayer(name)", function () {

    beforeEach(function () {
      this.body = {};
      this.body.appendChild = sinon.stub();

      this.canvas = {};

      this.document = {};
      this.document.getElementsByTagName = sinon.stub();
      this.document.getElementsByTagName.returns([this.body]);
      this.document.createElement = sinon.stub();
      this.document.createElement.returns(this.canvas);
    });

    it("should add a new canvas to the body of the document", function () {
      Render(this.document).addLayer('foreground');
      expect(this.document.getElementsByTagName.calledOnce).toBeTruthy();
      expect(this.document.getElementsByTagName.calledWith('body')).toBeTruthy();
      expect(this.body.appendChild.calledOnce).toBeTruthy();
      expect(this.body.appendChild.calledWith(this.canvas)).toBeTruthy();
    });

    it("should generate new canvas object, and assign an ID matching the name received as argument", function () {
      Render(this.document).addLayer('foreground');
      expect(this.document.createElement.calledWith('canvas')).toBeTruthy();
      expect(this.canvas.id).toEqual('foreground');
    });

    it("should create a new canvas object with the canvas element", function () {
      Render(this.document).addLayer('foreground');
      expect(this.CanvasMock.calledWith(this.canvas)).toBeTruthy();
    });

    it("should add the canvas object to the layer stack", function () {
      var r = Render(this.document);
      expect(Object.keys(r.layers).length).toEqual(0);
      r.addLayer('foreground');
      expect(Object.keys(r.layers).length).toEqual(1);
      r.addLayer('background');
      expect(Object.keys(r.layers).length).toEqual(2);
    });

    it("should expose layers as keys in the stack", function () {
      var canv = Object.create({});
      this.CanvasMock.returns(canv);

      var r = Render(this.document);
      r.addLayer('foreground');

      expect(r.layers['foreground']).toEqual(canv);
    });
  });

  describe(".refresh", function () {
    it("should", function () {
      var canvas_mock = {};
      canvas_mock.setWidth = sinon.stub();
      canvas_mock.setHeight = sinon.stub();
      canvas_mock.clear = sinon.stub();

      var r = Render();
      r.layers['canvas_mock'] = canvas_mock;

      r.getViewport = sinon.stub();

      r.getViewport.returns({
        height: 360,
        width: 480
      });

      r.refresh();

      expect(canvas_mock.setHeight.calledWith(360)).toBeTruthy();
      expect(canvas_mock.setWidth.calledWith(480)).toBeTruthy();
      expect(canvas_mock.clear.called).toBeTruthy();
    });
  });

  describe(".getLayer(name)", function () {
    beforeEach(function () {
      this.canv = Object.create({});
      this.CanvasMock.returns(this.canv);
      this.render = Render();
      this.render.layers['foreground'] = this.canv;
    });

    it("should return requested layer", function () {
      expect(this.render.getLayer('foreground')).toEqual(this.canv);
    });

    it("should return requested layer", function () {
      expect(this.render.getLayer('background')).toEqual(undefined)
    });
  });

});
