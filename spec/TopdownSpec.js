
var _ = require('lodash');
var sinon = require('sinon');
var proxyquire = require('proxyquire');

describe("Topdown", function () {

  var ServerMock = {};
  ServerMock.setPort = sinon.stub().returns(ServerMock);
  ServerMock.listen = sinon.stub().returns(ServerMock);

  beforeEach(function () {
    this.game = proxyquire('../src/Topdown', {
      './server/Server': function () {
        return ServerMock;
      }
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

    it("should be able chainable", function () {
      var game = this.game;

      expect(function(){

        game
          .on('connect', _.noop).trigger('connect')
          .on('disconnect', _.noop).trigger('disconnect');

      }).not.toThrow();
    });
  });

  describe('.listen(port)', function () {

    it('should call server listen', function () {
      this.game.listen(80);
      expect(ServerMock.listen.called).toBeTruthy();
    });

    it('should pass appropriate port to server listen', function () {
      this.game.listen(80);
      expect(ServerMock.setPort.calledWith(80)).toBeTruthy();
    });
  });
});
