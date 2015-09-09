describe("Client", function () {

  var sinon = require('sinon');
  var Client = require('../../src/client/Client');

  describe("Factory", function () {

    beforeEach(function () {
      this.render = {
        render: undefined
      };
      this.controls = {
        controls: undefined
      };
      this.network = {
        network: undefined
      };
      this.client = Client(this.render, this.controls, this.network);
    });

    it("should return new instance", function () {
      expect(this.client instanceof Client.Constructor).toBeTruthy();
    });

    it("should bind passed in render object as property", function () {
      expect(this.client.render).toEqual(this.render);
    });

    it("should bind passed in controls object as property", function () {
      expect(this.client.controls).toEqual(this.controls);
    });

    it("should bind passed in network object as property", function () {
      expect(this.client.network).toEqual(this.network);
    });
  });
});
