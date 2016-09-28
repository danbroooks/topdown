'use strict';

let negativeZero = (n) => (n == 0 && (1 / n) !== Number.POSITIVE_INFINITY);

describe("Point", function () {

  var Point = require('../../src/graphics/Point');

  it("should default x & y to 0 when no arguments passed to constructor", function () {
    var pt = Point();
    expect(pt.x).toEqual(0);
    expect(pt.y).toEqual(0);
  });

  it("should take arguments Point(x, y) in constructor", function () {
    var pt = Point(10, 20);
    expect(pt.x).toEqual(10);
    expect(pt.y).toEqual(20);
  });

  it("should take array of length 2 as Point([x, y]) in constructor", function () {
    var pt = Point([10, 20]);
    expect(pt.x).toEqual(10);
    expect(pt.y).toEqual(20);
  });

  it("should accept an object with numeric x & y values as an arg", function () {
    var pt = Point({ x: 12, y: 12 });
    expect(pt.x).toEqual(12);
    expect(pt.y).toEqual(12);
  })

  it("should throw exception when passed too short an array", function () {

    expect(function () {
      var ptTooShortArray = Point([10]);
    }).toThrow();
  });

  it("should throw exception when passed too long an array", function () {

    expect(function () {
      var ptTooLongArray = Point([10, 20, 30]);
    }).toThrow();
  });

  it("should throw exception when not passed enough arguments", function () {
    expect(function () {
      var ptNotEnoughArgs = Point(10);
    }).toThrow();
  });

  describe("shift", function () {

    var pt;

    beforeEach(function () {
      pt = Point(30, 20);
    });

    it("should throw when passed invalid args", function () {

      expect(function () {
        pt.shift('10', 10);
      }).toThrowError();
    });

    it("should shift based on two numbers", function () {
      let test = pt.shift(-10, 20);

      expect(test.x).toEqual(20);
      expect(test.y).toEqual(40);
    });

    it("should shift from another point instance", function () {
      let test = pt.shift(Point(40, -30));
      expect(test.x).toEqual(70);
      expect(test.y).toEqual(-10);
    });

    it("should be chainable", function () {
      let test = pt.shift(10, 10).shift(10, 10);
      expect(test.x).toEqual(50);
      expect(test.y).toEqual(40);
    });
  });

  describe("invert", function () {

    var pt;

    beforeEach(function () {
      pt = Point(-10, 20);
    });

    it("should invert the point values", function () {
      let test = pt.invert();
      expect(test.x).toEqual(10);
      expect(test.y).toEqual(-20);
    });

    it("should ensure 0 is not returned as -0", function () {
      var invertedzero = Point(0, 0).invert();

      expect(negativeZero(invertedzero.x)).toEqual(false);
      expect(negativeZero(invertedzero.y)).toEqual(false);
    });

    it("should be chainable", function () {
      let test = pt.invert().invert().invert();
      expect(test.x).toEqual(10);
      expect(test.y).toEqual(-20);
    });
  });

  describe("#rotate", function () {

    var pt;
    let validDegrees = 10;
    let validAxis = [10, 20];

    beforeEach(function () {
      pt = Point(0, 20);
    });

    it("should throw when arg axis passed is invalid", function () {

      expect(function () {
        pt.rotate('10', validDegrees);
      }).toThrowError();

      expect(function () {
        pt.rotate(10, validDegrees);
      }).toThrowError();

      expect(function () {
        pt.rotate([10], validDegrees);
      }).toThrowError();
    });

    it("should not throw when arg axis is either Point or an array of 2 values", function () {
      expect(function () {
        pt.rotate([1, 2], validDegrees);
      }).not.toThrowError();

      expect(function () {
        pt.rotate(Point(1, 2), validDegrees);
      }).not.toThrowError();
    });

    it("should throw when arg theta is not numeric", function () {

      expect(function () {
        pt.rotate(validAxis, '0');
      }).toThrowError();
    });

    it("should accept alternative argument, single number to rotate around [0,0]", function () {

      expect(function () {
        pt.rotate(10);
      }).not.toThrowError();

      expect(function () {
        pt.rotate("some string");
      }).toThrowError();

      expect(function () {
        pt.rotate(Point());
      }).toThrowError();
    });

    it("should rotate one point around another", function () {
      var full = pt.rotate(360);
      expect(full.x).toEqual(0);
      expect(full.y).toEqual(20);

      var half = pt.rotate(180);
      expect(half.x).toEqual(0);
      expect(half.y).toEqual(-20);

      var quart = pt.rotate(-90);
      expect(quart.x).toEqual(20);
      expect(quart.y).toEqual(0);

      var eigth = pt.rotate(-45);
      expect(Number(eigth.x.toFixed(4))).toEqual(14.1421);
      expect(Number(eigth.y.toFixed(4))).toEqual(14.1421);
    });
  });
});
