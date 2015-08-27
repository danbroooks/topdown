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

});
