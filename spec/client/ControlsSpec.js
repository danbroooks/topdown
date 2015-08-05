describe("Controls", function() {

  var Controls = require('../../src/client/Controls');

  describe("Factory", function () {
    it("should return new instance", function () {
      expect(Controls() instanceof Controls.Constructor).toBeTruthy();
    });
  });

});
