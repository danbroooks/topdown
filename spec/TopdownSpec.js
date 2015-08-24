describe("Topdown", function () {

  beforeEach(function () {
    this.game = require('../src/Topdown');
  });

  describe('Factory', function () {
    it("should create an event emitter object for tracking game events", function () {
      expect(this.game.events instanceof require('events').EventEmitter).toBeTruthy();
    });
  });

  describe('.on() / .trigger()', function () {

    it("should forward events on to event object", function (done) {

      this.game.on('connect', function () {
        expect(true).toBeTruthy();
        done();
      });

      this.game.trigger('connect');
    });

  });
});