var _ = require('lodash');

describe("RemoteClient", function() {

  var RemoteClient = require('../../src/server/RemoteClient');

  describe("Factory", function () {
    it("should return new instance", function () {
      expect(RemoteClient() instanceof RemoteClient.Constructor).toBeTruthy();
    });
  });

  describe(".key(string)", function () {
    it("should translate string representation of a key into a keycode",  function () {
      var cl = RemoteClient();
      var keymap = require('../../src/Keymap.js');
      _.forOwn(keymap, function (val, key) {
        expect(cl.key(key)).toEqual(val);
      });
    });

    it("should throw an error when passed an invalid string",  function () {
      var cl = RemoteClient();

      expect(function () {
        cl.key('some-invalid-string')
      }).toThrowError();

    });
  });

});
