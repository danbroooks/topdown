describe("Connection", function() {

  var Connection = require('../../src/server/Connection');

  describe("Factory", function () {

    it("should return new instance", function () {
      expect(Connection() instanceof Connection.Constructor).toBeTruthy();
    });

    it("should provide static method for generating collection of connections", function(){
      var col = Connection.Collection();
      col.add(Connection());
      col.add("Connection");
      expect(col.length).toEqual(1);
    });

  });
});
