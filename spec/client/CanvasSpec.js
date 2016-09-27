var sinon = require('sinon');
var _ = require('lodash');
var noop = _.noop;

describe('Canvas', function () {

  var Canvas = require('../../src/client/Canvas');

  var RenderingContext2d = sinon.mock({
    beginPath: noop,
    lineTo: noop,
    moveTo: noop,
    closePath: noop,
    fill: noop,
    stroke: noop,
    clearRect: noop,
  });

  beforeEach(function () {

    this.el = {
      width: 480,
      height: 360,
      getContext: () => RenderingContext2d.object
    };

    this.canvas = Canvas(this.el);
  });

  afterEach(RenderingContext2d.restore);

  describe('.setWidth / .setHeight', function () {
    it('should set a width on el', function () {
      this.canvas.setWidth(20);
      expect(this.el.width).toEqual(20);
    });

    it('should set a height on el', function () {
      this.canvas.setHeight(30);
      expect(this.el.height).toEqual(30);
    });
  });

  describe('.renderShape', function () {

    beforeEach(function () {
      this.points = [
        [10, 20],
        [20, 10],
        [10, 10]
      ];
    });

    it('should only need to open and close path once', function () {
      RenderingContext2d.expects('beginPath').once();
      RenderingContext2d.expects('closePath').once();
      this.canvas.renderShape(this.points);
      RenderingContext2d.verify();
    });

    it('should only need to fill and stroke once', function () {
      RenderingContext2d.expects('fill').once();
      RenderingContext2d.expects('stroke').once();
      this.canvas.renderShape(this.points);
      RenderingContext2d.verify();
    });

    it('should use stroke and fill values when they are passed in', function () {
      var fill = '#FF0000';
      var stroke = '#00FFFF';

      this.canvas.renderShape(this.points, fill, stroke);

      expect(RenderingContext2d.object.strokeStyle).toEqual(stroke);
      expect(RenderingContext2d.object.fillStyle).toEqual(fill);
    });

    it('should use stroke and fill defaults when nothing passed', function () {
      this.canvas.renderShape(this.points);

      expect(RenderingContext2d.object.strokeStyle).toEqual('#FFFFFF');
      expect(RenderingContext2d.object.fillStyle).toEqual('#FFFFFF');
    });

    it('should loop through the passed in points rendering them to the context', function () {
      var points = _.map(this.points, (value) => ({ x: value[0], y: value[1] }));
      var first = _.first(points);
      var second = points[1];
      var third = points[2];

      RenderingContext2d.expects('moveTo').once().withExactArgs(first.x, first.y);
      RenderingContext2d.expects('lineTo').once().withExactArgs(second.x, second.y);
      RenderingContext2d.expects('lineTo').once().withExactArgs(third.x, third.y);

      this.canvas.renderShape(this.points);

      RenderingContext2d.verify();
    });
  });

  describe('.clear', function () {

    it('should trigger #clearRect for size of canvas', function () {
      RenderingContext2d.expects('clearRect').once()
        .withExactArgs(0, 0, 480, 360);

      this.canvas.clear();

      RenderingContext2d.verify();
    });
  });
});
