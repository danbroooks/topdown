'use strict';

let _ = require('lodash');
let sinon = require('sinon');
let proxyquire = require('proxyquire');

describe("Collision", function () {
  var Point = require('../../src/graphics/Point');
  var Vector = require('../../src/graphics/Vector');
  var collision = proxyquire('../../src/physics/Collision', {
    'Vector': Vector
  });

  it("should throw error when not passed vector objects", function () {
    expect(() => collision())
      .toThrowError('Invalid arguments passed to Collision, requires two Vectors');
  });

  it("should not throw error when passed a vector object", function () {
    var va = Vector(
      Point(-1, -1),
      Point( 1, -1)
    );

    var vb = Vector(
      Point( -1,  1 ),
      Point(  1,  1 )
    );

    expect(() => collision(va, vb))
      .not.toThrow();
  });

  it("should return false if no intersection is found", function () {
    var va = Vector(
      Point(-1, -1),
      Point( 1, -1)
    );

    var vb = Vector(
      Point( -1,  1 ),
      Point(  1,  1 )
    );

    var c = collision(va, vb);
    expect(c).toEqual(false);
  });

  it("should work out the intersection point of two vectors", function () {
    var va = Vector(
      Point(-1,  1),
      Point( 1, -1)
    );

    var vb = Vector(
      Point(-1, -1),
      Point( 1,  1)
    );

    var c = collision(va, vb);

    expect(c.x).toEqual(0);
    expect(c.y).toEqual(0);
  });
});
