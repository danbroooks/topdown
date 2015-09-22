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

});
