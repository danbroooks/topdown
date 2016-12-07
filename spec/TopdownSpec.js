'use strict';
var _ = require('lodash');
var sinon = require('sinon');
var proxyquire = require('proxyquire');

describe("Topdown", function () {

  beforeEach(function () {
    var server = this.server = require('../src/server/Server')();

    this.game = proxyquire('../src/Topdown', {
      './server/Server': function () {
        return server;
      }
    });

    spyOn(server, 'listen');
  });

  describe('on() / trigger()', function () {

    it("should forward events on to event object", function (done) {

      this.game.on('connect', function () {
        expect(true).toBeTruthy();
        done();
      });

      this.game.trigger('connect');
    });

    it("should be chainable", function () {
      var game = this.game;

      expect(function(){

        game
          .on('connect', _.noop).trigger('connect')
          .on('disconnect', _.noop).trigger('disconnect');

      }).not.toThrow();
    });
  });

  describe('listen(port)', function () {

    beforeEach(function () {
      this.port = 80;
    });

    it('should call server listen', function () {
      this.game.listen(this.port);
      expect(this.server.listen).toHaveBeenCalled();
    });

    it('should pass appropriate port to server listen', function () {
      this.game.listen(this.port);
      expect(this.server.listen).toHaveBeenCalledWith(this.port);
    });

    it('should bind connect and disconnect event listeners', function () {
      spyOn(this.server, 'on');
      this.game.listen(this.port);

      expect(this.server.on).toHaveBeenCalled();
      expect(this.server.on.calls.count()).toEqual(2);

      expect(this.server.on.calls.argsFor(0)[0]).toEqual('connected');
      expect(this.server.on.calls.argsFor(1)[0]).toEqual('disconnected');
    });
  });

  describe('join / leave', function () {
    it('passes through client object', function (done) {
      let s = this.server;
      let connection = { client: {} };

      this.game.on('join', (client, server) => {
        expect(client).toEqual(connection.client);
        done();
      });

      this.game.listen(80);

      this.server.events.emit('connected', connection, s);
    });

    it('passes through server object', function (done) {
      let s = this.server;
      let connection = { client: {} };

      this.game.on('join', (client, server) => {
        expect(server).toEqual(s);
        done();
      });

      this.game.listen(80);

      this.server.events.emit('connected', connection, s);
    });
  });
});
