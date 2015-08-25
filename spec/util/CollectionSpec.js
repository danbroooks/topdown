describe("Collection", function () {

  var Module = require('../../src/util/Collection');

  function stringFilter(val) {
    return typeof val == 'string';
  }

  describe("Factory", function () {

    var Factory = Module;
    var Constructor = Module.Constructor;

    it("should return new instance", function () {
      expect(Factory() instanceof Constructor).toBeTruthy();
    });

    it("should take a filter argument, defaulting to constant true if nothing passed", function () {
      var c;

      c = Factory();
      expect(c.filter).toEqual(Constructor.DefaultFilter);

      c = Factory(stringFilter);
      expect(c.filter).toEqual(stringFilter);
    });
  });

  describe(".add(obj)", function () {

    var Collection = Module.Constructor;

    it("should add items to the list", function () {
      var c = new Collection();
      c.add(12);
      c.add('hello');
      expect(c.items[0]).toEqual(12);
      expect(c.items[1]).toEqual('hello');
    });

    it("should keep track of the number of items in the collection", function () {
      var c = new Collection();
      expect(c.length).toEqual(0);
      c.add({});
      expect(c.length).toEqual(1);
    });

    it("should only add items that pass the criteria of the filter", function () {
      var c = new Collection(stringFilter);
      c.add(12);
      c.add("hello");
      c.add(new Collection());
      c.add("world");
      expect(c.length).toEqual(2);
      expect(c.items).toContain('hello');
      expect(c.items).not.toContain(12);
    });

    it("should only add items that pass the criteria of the filter", function () {
      var c = new Collection(function (obj) {
        return obj instanceof Collection;
      });
      c.add(12);
      c.add("hello");
      c.add(new Collection());
      c.add("world");
      expect(c.length).toEqual(1);
      expect(c.items).not.toContain('hello');
      expect(c.items[0]).toEqual(jasmine.any(Collection));
    });
  });

  describe(".remove(fn)", function () {

    var Collection = Module.Constructor;

    it("should remove elements from list based on function passed to method", function () {
      var c = new Collection();
      c.add(1);
      c.add(1);
      c.add(2);
      c.add(5);

      c.remove(function (val) {
        return val > 4;
      });

      expect(c.length).toEqual(3);

      c.remove(function (val) {
        return val == 1;
      });

      expect(c.length).toEqual(1);
    });
  });

  describe(".each(fn)", function () {

    var Collection = Module.Constructor;

    beforeEach(function () {
      var c = new Collection();
      c.add(1);
      c.add(2);
      c.add(3);
      this.c = c;
    });

    it("should iterate over elements applying passed predicate", function () {
      this.c.each(function (val) {
        val += 1;
        return val;
      });

      expect(this.c.items[0]).toEqual(2);
      expect(this.c.items[1]).toEqual(3);
      expect(this.c.items[2]).toEqual(4);
    });
  });

});
