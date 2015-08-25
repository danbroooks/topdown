describe("Controls", function () {

  var sinon = require('sinon');

  var Controls = require('../../src/client/Controls');
  var Point = require('../../src/graphics/Point');
  var doc, win;

  beforeEach(function () {
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
    it("should block default context menu from opening", function () {
      Controls(win, doc);
      expect(doc.oncontextmenu()).toEqual(false);
    });
  });

  describe("Mouse", function () {

    var c;

    beforeEach(function () {
      win.onmousemove = function () {};
      c = Controls(win, doc);
    });

    it("should track user's mouse position as a point object", function () {
      expect(c.mouse instanceof Point.Constructor).toBeTruthy();
    });

    it("should track user's mouse position when it moves", function () {
      win.onmousemove({
        offsetX: 20,
        offsetY: 40
      });
      expect(c.mouse.x).toEqual(20);
      expect(c.mouse.y).toEqual(40);
    });

    it("should be an immutable property", function () {
      win.onmousemove({
        offsetX: 20,
        offsetY: 40
      });

      expect(c.mouse.x).toEqual(20);
      expect(c.mouse.y).toEqual(40);

      c.mouse = Point(50, 100);

      expect(c.mouse.x).toEqual(20);
      expect(c.mouse.y).toEqual(40);
    });
  });

  describe("Keystream", function () {

    var c;

    beforeEach(function () {
      this.clock = sinon.useFakeTimers();
      win.onkeydown = function () {};
      win.onkeyup = function () {};
      c = Controls(win, doc);
    });

    afterEach(function () {
      this.clock.restore();
    })

    it("should be an immutable property", function (done) {

      c.keystream = {};

      c.keystream.onValue(function (val) {
        expect(val).toEqual([15]);
      });

      win.onkeydown({
        which: 15
      });

      this.clock.tick(400);
      done();
    });

    it("should track user's keypresses", function (done) {

      var keys = [12, 18];

      c.keystream.onValue(function (val) {
        expect(val).toEqual(keys);
      });

      win.onkeydown({
        which: 12
      });
      win.onkeydown({
        which: 15
      });
      win.onkeydown({
        which: 18
      });
      win.onkeyup({
        which: 15
      });

      this.clock.tick(400);
      done();
    });

    it("should be configurable to only listen to certain keys", function (done) {

      c.configure({
        'up': 38
      });

      c.keystream.onValue(function (val) {
        expect(val).toEqual([38]);
      });

      win.onkeydown({
        which: 42
      });
      win.onkeydown({
        which: 38
      });
      win.onkeydown({
        which: 39
      });

      this.clock.tick(400);
      done();
    });

  });

});
