describe("Collision", function () {

  var Collision = require('../../src/physics/Collision');

  describe("Factory", function () {

    it("should attach passed vector objects to collision object", function () {
      var va = {};
      var vb = {};
      var c = Collision(va, vb);
      expect(c.va).toEqual(va);
      expect(c.vb).toEqual(vb);
    });
  });
});
