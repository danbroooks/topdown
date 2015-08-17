describe("RemoteClient", function() {

  var RemoteClient = require('../../src/server/RemoteClient');

  describe("Factory", function () {
    it("should return new instance", function () {
      expect(RemoteClient() instanceof RemoteClient.Constructor).toBeTruthy();
    });
  });

});
