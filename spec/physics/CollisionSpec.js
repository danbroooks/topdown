describe("Collision", function () {

  var _ = require('lodash');
  var sinon = require('sinon');
  var proxyquire = require('proxyquire');
  var Vector = require('../../src/graphics/Vector');
  var Collision;

  beforeEach(function () {
    this.VectorMock = Vector;

    Collision = proxyquire('../../src/physics/Collision', {
      'Vector': this.VectorMock
    });
  });

  describe("Factory", function () {

    beforeEach(function () {
      this.stub = sinon.stub(this.VectorMock, 'Created');
    });

    afterEach(function () {
      this.stub.restore();
    });

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
});
