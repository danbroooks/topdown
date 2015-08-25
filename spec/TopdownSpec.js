
var sinon = require('sinon');
var proxyquire = require('proxyquire');

describe("Topdown", function () {

  var ServerMock = {};

  beforeEach(function () {
    this.game = proxyquire('../src/Topdown', {
      './server/Server': ServerMock
    });
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

  describe('.listen(port)', function () {

    it('should call server listen', function () {
      ServerMock.Listen = sinon.stub();
      this.game.listen(80);
      expect(ServerMock.Listen.called).toBeTruthy();
    });

    it('should pass appropriate port to server listen', function () {
      ServerMock.Listen = sinon.stub();
      this.game.listen(80);
      expect(ServerMock.Listen.calledWith(80)).toBeTruthy();
    });
  });
});
