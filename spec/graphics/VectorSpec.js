'use strict';

describe("Vector", function () {

  var Vector = require('../../src/graphics/Vector');
  var P = require('../../src/graphics/Point');
  var rnd = (n) => Math.round(n * 100) / 100;
  const CONSTRUCTOR_ERROR = 'Vector constructor takes two Point objects.';

  it("should accept two Point objects as parameters", function () {
    expect(() => Vector(P(), P()))
      .not.toThrowError(CONSTRUCTOR_ERROR);
  });

  it("should throw if passed erroneous parameters", function () {
    expect(() => Vector(2, 'hello'))
      .toThrowError(CONSTRUCTOR_ERROR);
  });

  it("should throw if not passed any parameters", function () {
    expect(Vector)
      .toThrowError(CONSTRUCTOR_ERROR);
  });

  it("should throw if only passed one parameter", function () {
    expect(() => Vector(P()))
      .toThrowError(CONSTRUCTOR_ERROR);
  });

  describe(".angle()", function () {
    it("should calculate it's angle", function () {
      var c = P(0, 0);

      var v0 = Vector(c, P(0, 1));
      expect(v0.angle()).toEqual(0);

      var v45 = Vector(c, P(1, 1));
      expect(v45.angle()).toEqual(45);

      var v90 = Vector(c, P(1, 0));
      expect(v90.angle()).toEqual(90);

      var v135 = Vector(c, P(1, -1));
      expect(v135.angle()).toEqual(135);

      var v180 = Vector(c, P(0, -1));
      expect(v180.angle()).toEqual(180);

      var v225 = Vector(c, P(-1, -1));
      expect(v225.angle()).toEqual(225);

      var v270 = Vector(c, P(-1, 0));
      expect(v270.angle()).toEqual(270);

      var v315 = Vector(c, P(-1, 1));
      expect(v315.angle()).toEqual(315);
    });
  });

  describe(".length()", function () {
    it("should calculate it's length", function () {
      var c = P(0, 0);

      var l0 = Vector(c, c).length();
      expect(l0).toEqual(0);

      var l1 = Vector(c, P(0, 1)).length();
      expect(l1).toEqual(1);

      var nl1 = Vector(c, P(0, -1)).length();
      expect(nl1).toEqual(1);

      var angled = Vector(c, P(700, 500)).length();
      expect(rnd(angled)).toEqual(860.23);
    });
  });

  describe("collision", function () {

    it("should return false if no intersection is found", function () {
      var va = Vector(P(-1, -1), P( 1, -1));
      var vb = Vector(P( -1,  1 ), P(  1,  1 ));

      var c = va.collision(vb);
      expect(c).toEqual(false);
    });

    it("should work out the intersection point of two vectors", function () {
      var va = Vector(P(-1,  1), P( 1, -1));
      var vb = Vector(P(-1, -1), P( 1,  1));

      var c = va.collision(vb);

      expect(c.x).toEqual(0);
      expect(c.y).toEqual(0);
    });
  });
});
