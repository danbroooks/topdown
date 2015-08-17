describe("Render", function() {

  var Render = require('../../src/client/Render');

  describe("Factory", function () {
    it("should return new instance", function () {
      expect(Render() instanceof Render.Constructor).toBeTruthy();
    });
  });

});
