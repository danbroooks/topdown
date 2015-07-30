describe("Collection", function() {

  var Collection = require('../../src/util/Collection');

  describe("Factory", function () {
    it("should return new instance", function () {
      expect(Collection() instanceof Collection.Constructor).toBeTruthy();
    });
  });

});
