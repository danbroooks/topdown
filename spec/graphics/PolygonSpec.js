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

    it("should throw when passed non array value", function () {
      expect(function () {
        Polygon(12);
      }).toThrow();
    });

    it("should throw when not passed an array of points", function () {
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
      expect(Point.isValid(poly.points[2])).toBeTruthy();
    });

    it("should take an array of x/y pairs to construct", function () {
      var arrPoly = Polygon([
        [0, 0],
        [20, 0],
        [10, 10]
      ]);

      expect(arrPoly.points.length).toBe(3);
      expect(Point.isValid(arrPoly.points[2])).toBeTruthy();

      expect(arrPoly.points[0].y).toEqual(0);
      expect(arrPoly.points[1].x).toEqual(20);
      expect(arrPoly.points[2].y).toEqual(10);
    });

  });

  describe(".Clone", function () {
    it("should clone object", function () {
      var poly = Polygon([
        [0, 0],
        [20, 0],
        [10, 10]
      ]);

      var clone = Polygon.Clone(poly);

      expect(poly !== clone).toBeTruthy();
      expect(poly.points !== clone.points).toBeTruthy();

      clone.rotate(2);
      expect(poly.points[0] !== clone.points[0]).toBeTruthy();
    });

  });

  describe(".rotate", function () {

    it("should", function () {
      var poly = Polygon([
        [-5, -10],
        [-5, 10],
        [5, 10],
        [5, -10],
      ]);

      poly.rotate(90);

      expect(poly.points[0].x).toEqual(10);
      expect(poly.points[0].y).toEqual(-5);

      expect(poly.points[1].x).toEqual(-10);
      expect(poly.points[1].y).toEqual(-5);

      expect(poly.points[2].x).toEqual(-10);
      expect(poly.points[2].y).toEqual(5);

      expect(poly.points[3].x).toEqual(10);
      expect(poly.points[3].y).toEqual(5);
    });
  });
});
