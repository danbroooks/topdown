describe("Canvas", function () {

  var Canvas = require('../../src/client/Canvas');

  describe("Factory", function () {

    beforeEach(function () {
      this.canvas = Canvas();
    });

    it("should return new instance", function () {
      expect(this.canvas instanceof Canvas.Constructor).toBeTruthy();
    });
  });
});
