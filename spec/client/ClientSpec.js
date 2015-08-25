describe("Client", function () {

  var Client = require('../../src/client/Client');

  describe("Factory", function () {
    it("should return new instance", function () {
      expect(Client() instanceof Client.Constructor).toBeTruthy();
    });

    it("should bind passed in render object as property", function () {
      var render = {};
      expect(Client(render).render).toEqual(render);
    });
  });
});
