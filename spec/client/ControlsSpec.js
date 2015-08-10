describe("Controls", function() {

  var Controls = require('../../src/client/Controls');
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

});
