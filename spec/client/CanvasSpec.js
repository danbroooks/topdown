var sinon = require('sinon');

describe("Canvas", function () {

  var Canvas = require('../../src/client/Canvas');
  var noop = function () {};

  function Canvas2DRenderingContext() {
    return {
      beginPath: noop,
      lineTo: noop,
      moveTo: noop,
      closePath: noop,
      fill: noop,
      stroke: noop,
      clearRect: noop
    };
  }

  beforeEach(function () {
    this.el = {
      width: 480,
      height: 360
    };
    this.canvas = Canvas(this.el);
    this.mockCTX = sinon.mock(Canvas2DRenderingContext());
  });

  describe("Factory", function () {

    it("should return new instance", function () {
      expect(this.canvas instanceof Canvas.Constructor).toBeTruthy();
    });

    it("should store element passed as .el", function () {
      expect(this.canvas.el).toEqual(this.el);
    });
  });

  describe(".setWidth / .setHeight", function () {
    it("should set a width on .el", function () {
      this.canvas.setWidth(20);
      expect(this.canvas.el.width).toEqual(20);
    });

    it("should set a height on .el", function () {
      this.canvas.setHeight(30);
      expect(this.canvas.el.height).toEqual(30);
    });
  });

  describe(".draw", function () {

    beforeEach(function () {
      this.canvas.renderShape = sinon.stub();

      this.points = {
        a: [ [10, 10], [20, 10], [10, 20] ],
        b: [ [5, 10], [10, 5], [10, 10] ]
      };

      this.canvas.draw([
        { points: this.points.a },
        { points: this.points.b },
      ]);
    });

    afterEach(function () {
      this.canvas.renderShape.reset();
    });

    it("should render all shapes passed in, no more no less", function () {
      var renderShape = this.canvas.renderShape;
      expect(renderShape.calledTwice).toBeTruthy();
      expect(renderShape.calledThrice).toBeFalsy();
    });

    it("should render shapes by forwarding to renderShape", function () {
      var renderShape = this.canvas.renderShape;
      expect(renderShape.firstCall.calledWith(this.points.a)).toBeTruthy();
      expect(renderShape.secondCall.calledWith(this.points.b)).toBeTruthy();
    });

  });

  describe(".renderShape", function () {

    beforeEach(function () {
      this.canvas.ctx = sinon.stub().returns(this.mockCTX.object);
      this.canvas.setStrokeStyle = sinon.stub();
      this.canvas.setFillStyle = sinon.stub();

      this.points = [
        [10, 20],
        [20, 10],
        [10, 10]
      ];
    });

    afterEach(function () {
      this.canvas.setStrokeStyle.reset();
      this.canvas.setFillStyle.reset();
    });

    it("should only need to open and close path once", function () {
      this.mockCTX.expects('beginPath').once();
      this.mockCTX.expects('closePath').once();
      this.canvas.renderShape(this.points);
      this.mockCTX.verify();
    });

    it("should only need to fill and stroke once", function () {
      this.mockCTX.expects('fill').once();
      this.mockCTX.expects('stroke').once();
      this.canvas.renderShape(this.points);
      this.mockCTX.verify();
    });

    it("should use stroke and fill values passed in", function () {

      var canvas = this.canvas;
      var fill = '#FF0000';
      var stroke = '#00FFFF';

      canvas.renderShape(this.points, fill, stroke);

      expect(
        canvas.setStrokeStyle.calledWith(stroke))
        .toBeTruthy();

      expect(
        canvas.setFillStyle.calledWith(fill))
        .toBeTruthy();
    });

    it("should use stroke and fill defaults when nothing passed", function () {

      var Constructor = Canvas.Constructor;
      var canvas = this.canvas;

      canvas.renderShape(this.points);

      expect(
        canvas.setStrokeStyle.calledWith('#FFFFFF'))
        .toBeTruthy();

      expect(
        canvas.setFillStyle.calledWith('#FFFFFF'))
        .toBeTruthy();
    });

    it("should loop through the passed in points rendering them to the context", function () {

      var mock = this.mockCTX;
      var pts = this.points;
      var firstPoint = pts[0];

      mock.expects('moveTo').once()
        .withExactArgs(firstPoint[0], firstPoint[1]);

      mock.expects('lineTo').once()
        .withExactArgs(pts[1][0], pts[1][1]);

      mock.expects('lineTo').once()
        .withExactArgs(pts[2][0], pts[2][1]);

      this.canvas.renderShape(this.points);

      mock.verify();
    });
  });

  describe('.clear', function () {

    beforeEach(function () {
      this.canvas.ctx = sinon.stub().returns(this.mockCTX.object);
    });

    it("should trigger 'clearRect' for size of canvas", function () {
      var mock = this.mockCTX;

      mock.expects('clearRect').once()
        .withExactArgs(0, 0, 480, 360);

      this.canvas.clear();

      mock.verify();
    });
  });
});
