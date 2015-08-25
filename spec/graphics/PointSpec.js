describe("Point", function() {

  var Point = require('../../src/graphics/Point');

  describe("constructor", function() {

    it("should return new instance", function() {
      expect(Point() instanceof Point.Constructor).toBeTruthy();
    });

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
          }).toThrow();
    });

    it("should throw exception when passed too long an array", function() {

      expect(function () {
        var ptTooLongArray = Point([10, 20, 30]);
          }).toThrow();
    });

    it("should throw exception when not passed enough arguments", function() {

      expect(function () {
        var ptNotEnoughArgs = Point(10);
          }).toThrow();
    });

    it("should throw exception when passed too many arguments", function() {

      expect(function(){
        var ptTooManyArgs = Point(10, 20, 30);
          }).toThrow();
    });
  });

  describe("Instance method shift", function() {

    var pt;

    beforeEach(function(){
      pt = Point(30, 20);
    });

    it("should throw when passed invalid args", function(){

      expect(function() {
        pt.shift('10', 10);
          }).toThrowError();
    });

    it("should shift based on two numbers", function() {
      pt.shift(-10, 20);

      expect(pt.x).toEqual(20);
      expect(pt.y).toEqual(40);
    });

    it("should shift from another point instance", function() {
      pt.shift( Point(40, -30) );
      expect(pt.x).toEqual(70);
      expect(pt.y).toEqual(-10);
    });

    it("should be chainable", function() {
      expect(pt.shift(10, 10) instanceof Point.Constructor).toBeTruthy();
    });
  });

  describe("Instance method invert", function() {

    var pt;

    beforeEach(function(){
      pt = Point(-10, 20);
    });

    it("should invert the point values", function() {
      pt.invert();
      expect(pt.x).toEqual(10);
      expect(pt.y).toEqual(-20);
    });

    it("should ensure 0 is not returned as -0", function(){
      var invertedzero = Point(0, 0).invert();

      expect(1 / invertedzero.x).toEqual(Number.POSITIVE_INFINITY);
      expect(1 / invertedzero.y).toEqual(Number.POSITIVE_INFINITY);

    });

    it("should be chainable", function() {
      expect(pt.invert() instanceof Point.Constructor).toBeTruthy();
    });
  });

  describe("Instance method rotate", function() {

    var pt;
    var validDegrees = 10;
    var validAxis = [10, 20];

    beforeEach(function () {
      pt = Point(0, 20);
    });

    it("should throw when arg axis passed is invalid", function(){

      expect(function() {
        pt.rotate('10', validDegrees);
          }).toThrowError();

      expect(function() {
        pt.rotate(10, validDegrees);
          }).toThrowError();

      expect(function() {
        pt.rotate([10], validDegrees);
          }).toThrowError();
    });

    it("should not throw when arg axis is either Point or an array of 2 values", function(){

      expect(function() {
        pt.rotate([1, 2], validDegrees);
          }).not.toThrowError();

      expect(function() {
        pt.rotate(Point(1, 2), validDegrees);
          }).not.toThrowError();
    });

    it("should throw when arg theta is not numeric", function(){

      expect(function() {
        pt.rotate(validAxis, '0');
          }).toThrowError();
    });

    it("should accept alternative argument, single number to rotate around [0,0]", function(){

      expect(function() {
        pt.rotate(10);
          }).not.toThrowError();

      expect(function(){
        pt.rotate("some string");
          }).toThrowError();

      expect(function(){
        pt.rotate(Point());
          }).toThrowError();
    });

    it("should rotate one point around another", function(){
      pt.rotate(360);
      expect(pt.x).toEqual(0);
      expect(pt.y).toEqual(20);

      pt.rotate(180);
      expect(pt.x).toEqual(0);
      expect(pt.y).toEqual(-20);

      pt.rotate(-90);
      expect(pt.x).toEqual(-20);
      expect(pt.y).toEqual(0);

      pt.rotate(-45);
      expect(Number( pt.x.toFixed(4) )).toEqual(-14.1421);
      expect(Number( pt.y.toFixed(4) )).toEqual(14.1421);
    });
  });

  describe("Static method Clone", function() {

    it("should return a Point instance", function(){
      expect(Point.Clone(Point()) instanceof Point.Constructor).toBeTruthy();
    });

    it("should return a new cloned instance", function(){
      var point = Point();
      var clone = Point.Clone(point);
      clone.shift(10, 10);

      expect(clone.x).not.toEqual(point.x);
      expect(clone.y).not.toEqual(point.y);
    });

    it("should throw error when not passed a point instance", function(){

      expect(function(){
        Point.Clone(null);
          }).toThrowError();

      expect(function(){
        Point.Clone(22);
          }).toThrowError();
    });
  });

  describe("Static method Add", function() {

    beforeEach(function(){
      this.a = Point(10, 20);
      this.b = Point(20, 10);
      this.pt = Point.Add(this.a, this.b);
    });

    it("should add two points together", function () {
      expect(this.pt.x).toEqual(30);
      expect(this.pt.y).toEqual(30);
    });

    it("should not effect passed in instances", function () {
      expect(this.a.x).toEqual(10);
      expect(this.a.y).toEqual(20);
      expect(this.b.x).toEqual(20);
      expect(this.b.y).toEqual(10);
    });

  });

  describe("Static invert", function() {

    beforeEach(function(){
      this.orig = Point(10, 20);
      this.pt = Point.Invert(this.orig);
    });

    it("should invert the position of the passed Point object", function() {
      expect(this.pt.x).toEqual(-10);
      expect(this.pt.y).toEqual(-20);
    });

    it("should not effect the instance passed in", function() {
      expect(this.pt.x).not.toEqual(this.orig.x);
      expect(this.pt.y).not.toEqual(this.orig.y);
    });
  });


});
