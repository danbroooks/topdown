describe("Point", function() {

  var Point = require('../../src/graphics/Point');

  beforeEach(function() {
    this.pt = Point();
  });

  it("should be ", function() {
    expect(this.pt.x).toEqual(0);
    expect(this.pt.y).toEqual(0);
  });
});
