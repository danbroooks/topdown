var Vector = require('../../src/graphics/Vector');
var Point = require('../../src/graphics/Point');

describe("Vector", function () {

  describe("Factory", function () {

    it("should accept two Point objects as parameters", function () {
      expect(function () {
        Vector(Point(), Point());
      }).not.toThrowError('Vector constructor takes two Point objects.');
    });

    it("should throw if passed erroneous parameters", function () {
      expect(function () {
        Vector(2, 'hello');
      }).toThrowError('Vector constructor takes two Point objects.');
    });

    it("should throw if not passed any parameters", function () {
      expect(function () {
        Vector();
      }).toThrowError('Vector constructor takes two Point objects.');
    });

    it("should throw if only passed one parameter", function () {
      expect(function () {
        Vector(Point())
      }).toThrowError('Vector constructor takes two Point objects.');
    });

  });

  describe(".angle()", function () {
    it("", function () {
      var c = Point(0, 0);

      var v0 = Vector(c, Point(0, 1));
      expect(v0.angle()).toEqual(0);

      var v45 = Vector(c, Point(1, 1));
      expect(v45.angle()).toEqual(45);

      var v90 = Vector(c, Point(1, 0));
      expect(v90.angle()).toEqual(90);

      var v45 = Vector(c, Point(1, -1));
      expect(v45.angle()).toEqual(135);

      var v180 = Vector(c, Point(0, -1));
      expect(v180.angle()).toEqual(180);

      var v270 = Vector(c, Point(-1, -1));
      expect(v270.angle()).toEqual(225);

      var v270 = Vector(c, Point(-1, 0));
      expect(v270.angle()).toEqual(270);

      var v270 = Vector(c, Point(-1, 1));
      expect(v270.angle()).toEqual(315);
    });
  });

  describe(".length()", function () {
    it("", function () {

    });
  });

});
