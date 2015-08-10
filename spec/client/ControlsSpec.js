describe("Controls", function() {

  var Controls = require('../../src/client/Controls');
  var Point = require('../../src/graphics/Point');
  var doc, win;

  beforeEach(function(){
    doc = {
      oncontextmenu: undefined
    };
    win = {};
  });

  describe("Factory", function () {
    it("should return new instance", function () {
      expect(Controls(win, doc) instanceof Controls.Constructor).toBeTruthy();
    });
  });

  describe("Context Menu", function () {
    it("should block default context menu from opening", function(){
      Controls(win, doc);
      expect(doc.oncontextmenu()).toEqual(false);
    });
  });

  describe("Mouse", function () {

    var c;

    beforeEach(function(){
      win.onmousemove = function() {};
      c = Controls(win, doc);
    });

    it("should track user's mouse position as a point object", function(){
      expect(c.mouse instanceof Point.Constructor).toBeTruthy();
    });

    it("should track user's mouse position when it moves", function() {
      win.onmousemove({
        offsetX: 20, offsetY: 40
      });
      expect(c.mouse.x).toEqual(20);
      expect(c.mouse.y).toEqual(40);
    });

    it("should be an immutable property", function() {
      win.onmousemove({
        offsetX: 20, offsetY: 40
      });

      expect(c.mouse.x).toEqual(20);
      expect(c.mouse.y).toEqual(40);

      c.mouse = Point(50, 100);

      expect(c.mouse.x).toEqual(20);
      expect(c.mouse.y).toEqual(40);
    });
  });

});
