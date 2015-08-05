describe("Controls", function() {

  var Controls = require('../../src/client/Controls');
  var doc;

  beforeEach(function(){
    doc = {
      oncontextmenu: undefined
    };
  });

  describe("Factory", function () {
    it("should return new instance", function () {
      expect(Controls(doc) instanceof Controls.Constructor).toBeTruthy();
    });
  });

  describe("Context Menu", function () {
    it("should block default context menu from opening", function(){
      Controls(doc);
      expect(doc.oncontextmenu()).toEqual(false);
    });
  });

});
