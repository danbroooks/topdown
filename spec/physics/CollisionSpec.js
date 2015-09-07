describe("Collision", function () {

  var _ = require('lodash');
  var sinon = require('sinon');
  var proxyquire = require('proxyquire');
  var Vector = require('../../src/graphics/Vector');
  var Collision = proxyquire('../../src/physics/Collision', {
    'Vector': Vector
  });

  beforeEach(function () {
    this.stub = sinon.stub(Vector, 'Created');
  });

  afterEach(function () {
    this.stub.restore();
  });

  describe("Factory", function () {

    it("should throw error when not passed vector objects", function () {
      this.stub.returns(false);

      expect(function () {
          Collision();
        })
        .toThrowError('Invalid arguments passed to Collision, requires two Vectors');
    });

    it("should not throw error when passed a vector object", function () {
      this.stub.returns(true);

      expect(function () {
          Collision();
        })
        .not.toThrow();
    });

    it("should attach passed vector objects to collision object", function () {
      this.stub.returns(true);

      var va = {};
      var vb = {};
      var c = Collision(va, vb);
      expect(c.va).toEqual(va);
      expect(c.vb).toEqual(vb);
    });
  });

  describe(".getIntersectionPoint", function () {

    beforeEach(function () {
      this.stub.returns(true);
    });

    it("should return false if no intersection is found", function () {
      var va = {
        from: { x: -1, y: -1 },
        to: { x: 1, y: -1 }
      };

      var vb = {
        from: { x: -1, y: 1 },
        to: { x: 1, y: 1 },
      };

      var c = Collision(va, vb);
      expect(c.getIntersectionPoint()).toEqual(false);
    });

    it("should work out the intersection point of two vectors", function () {
      var va = {
        from: { x: -1, y: 1 },
        to: { x: 1, y: -1 }
      };

      var vb = {
        from: { x: -1, y: -1 },
        to: { x: 1, y: 1 },
      };

      var c = Collision(va, vb);
      var i = c.getIntersectionPoint();

      expect(i.x).toEqual(0);
      expect(i.y).toEqual(0);
    });

  });

});
