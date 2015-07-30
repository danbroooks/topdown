describe("Collection", function() {

  var Collection = require('../../src/util/Collection');

  describe("Factory", function () {
    it("should return new instance", function () {
      expect(Collection() instanceof Collection.Constructor).toBeTruthy();
    });
  });

  describe(".add(obj)", function(){

    it("should add items to the list", function() {
      var c = Collection();
      c.add(12);
      c.add('hello');
      expect(c.items[0]).toEqual(12);
      expect(c.items[1]).toEqual('hello');
    });

    it("should keep track of the number of items in the collection", function(){

      var c = Collection();
      expect(c.length).toEqual(0);
      c.add({});
      expect(c.length).toEqual(1);

    });
    
  });

});
