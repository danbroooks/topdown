describe("Canvas", function () {

  var Canvas = require('../../src/client/Canvas');

  beforeEach(function () {
    this.el = {
      width: 0,
      height: 0
    };
    this.canvas = Canvas(this.el);
  });

  describe("Factory", function () {

    it("should return new instance", function () {
      expect(this.canvas instanceof Canvas.Constructor).toBeTruthy();
    });

    it("should store element passed as .el", function () {
      expect(this.canvas.el).toEqual(this.el);
    });
  });

  describe(".setWidth / .setHeight", function () {
    it("should set a width on .el", function () {
      this.canvas.setWidth(20);
      expect(this.canvas.el.width).toEqual(20);
    });

    it("should set a height on .el", function () {
      this.canvas.setHeight(30);
      expect(this.canvas.el.height).toEqual(30);
    });
  });
});
