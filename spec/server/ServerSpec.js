describe("Server", function() {

  var Server = require('../../src/server/Server');

  describe("Factory", function () {
    it("should return new instance", function () {
      expect(Server() instanceof Server.Constructor).toBeTruthy();
    });
  });

});
