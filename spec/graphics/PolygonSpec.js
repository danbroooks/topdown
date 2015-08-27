describe("Polygon", function () {

  var Polygon = require('../../src/graphics/Polygon');
  var Point = require('../../src/graphics/Point');

  describe("Constructor", function () {});

  describe("Factory", function () {

    it("should throw when passed nothing", function () {
      expect(function () {
        Polygon();
      }).toThrow();
    });

    it("should throw when not passed an array of points", function () {
      expect(function () {
        Polygon(12);
      }).toThrow();

      expect(function () {
        Polygon([123, 3]);
      }).toThrow();
    });

    it("should return new instance", function () {
      expect(Polygon([]) instanceof Polygon.Constructor).toBeTruthy();
    });

    it("should throw when passed invalid array", function () {

      expect(function () {
        var invalidPoints = Polygon([
          [10, 20], [10, 30], [20, 30, 40]
        ]);
      }).toThrow();
    });

    it("should take an array of points to construct", function () {
      var poly = Polygon([
        Point(0, 0),
        Point(20, 0),
        Point(10, 10)
      ]);

      expect(poly.points.length).toBe(3);
      expect(poly.points[2] instanceof Point.Constructor).toBeTruthy();
    });

    it("should take an array of x/y pairs to construct", function () {
      var arrPoly = Polygon([
        [0, 0],
        [20, 0],
        [10, 10]
      ]);

      expect(arrPoly.points.length).toBe(3);
      expect(arrPoly.points[2] instanceof Point.Constructor).toBeTruthy();
    });

  });

});
