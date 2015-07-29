describe("FileSystem", function() {

  var FileSystem = require('../../src/server/FileSystem');

  describe("Factory", function () {
    it("should return new instance", function () {
      expect(FileSystem() instanceof FileSystem.Constructor).toBeTruthy();
    });
  });

});
