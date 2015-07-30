describe("Connection", function() {

  var Connection = require('../../src/server/Connection');

  describe("Factory", function () {
    it("should return new instance", function () {
      expect(Connection() instanceof Connection.Constructor).toBeTruthy();
    });
  });

});
