describe("Network", function() {

  var Network = require('../../src/client/Network');

  describe("Factory", function () {
    it("should return new instance", function () {
      expect(Network() instanceof Network.Constructor).toBeTruthy();
    });
  });

});
