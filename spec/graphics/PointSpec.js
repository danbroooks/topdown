describe("Point", function() {

  var Point = require('../../src/graphics/Point');

  it("should default x & y to 0 when no arguments passed to constructor", function() {
    var pt = Point();
    expect(pt.x).toEqual(0);
    expect(pt.y).toEqual(0);
  });

  it("should take arguments Point(x, y) in constructor", function() {
    var pt = Point(10, 20);
    expect(pt.x).toEqual(10);
    expect(pt.y).toEqual(20);
  });

  it("should take array of length 2 as Point([x, y]) in constructor", function(){
    var pt = Point([10, 20]);
    expect(pt.x).toEqual(10);
    expect(pt.y).toEqual(20);
  });

  it("should throw exception when passed too short an array", function() {

    expect(function () {
      var ptTooShortArray = Point([10]);
    }).toThrow(
      new Error('Point was passed invalid arguments')
    );
  });

  it("should throw exception when passed too long an array", function() {

    expect(function () {
      var ptTooLongArray = Point([10, 20, 30]);
    }).toThrow(
      new Error('Point was passed invalid arguments')
    );
  });

  it("should throw exception when not passed enough arguments", function() {

    expect(function () {
      var ptNotEnoughArgs = Point(10);
    }).toThrow(
      new Error('Point was passed invalid arguments')
    );
  });

  it("should throw exception when passed too many arguments", function() {
    expect(function(){
      var ptTooManyArgs = Point(10, 20, 30);
    }).toThrow(
      new Error('Point was passed invalid arguments')
    );
  });

});
