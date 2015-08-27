describe("Factory", function () {

  describe(".Build(Class, preconstructor)", function () {

    var MockClass = function () {
      this.c = 20;
    };

    MockClass.prototype.b = 12;

    var Build = require('../../src/util/Factory').Build;

    it("should return an object that is an instance of the passed object", function () {
      var someObj = Build(MockClass)();
      expect(someObj instanceof MockClass).toEqual(true);
    });

    it("should store the passed object to itself for external access", function () {
      var f = Build(MockClass);
      expect(f.Constructor).toEqual(MockClass);
    });

    it("should take default values from the prototype", function () {
      var f = Build(MockClass);
      expect(f().b).toEqual(12);
    });

    it("should override values set in the object passed", function () {
      var f = Build(MockClass);
      expect(f({
        b: 15
      }).b).toEqual(15);
    });

    it("should not override values set in the constructor", function () {
      var f = Build(MockClass);
      expect(f({
        c: 7
      }).c).toEqual(20);
    });

    it("should take a preconstructor function that can be used to pre-construct passed opts", function () {
      var f = Build(MockClass, function (x, y) {
        return {
          x: x + 1,
          y: y + 1
        };
      });

      var someObj = f(12, 21);
      expect(someObj.x).toEqual(13);
      expect(someObj.y).toEqual(22);
    });

    describe("Root extensions", function () {

      describe('.instanceof()', function () {

        it("should add in instanceof method which should return true when passed factory constructor", function () {
          var f = Build(MockClass);
          expect(f().instanceof(MockClass)).toBeTruthy();
        });

      });

    });
  });
});
