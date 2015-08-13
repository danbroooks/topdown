describe("Client", function() {

  var Client = require('../../src/client/Client');

  describe("Factory", function () {
    it("should return new instance", function () {
      expect(Client() instanceof Client.Constructor).toBeTruthy();
    });
  });
});
