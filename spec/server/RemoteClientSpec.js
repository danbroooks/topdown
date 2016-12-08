describe("RemoteClient", function () {

  var _ = require('lodash');
  var sinon = require('sinon');
  var RemoteClient = require('../../src/server/RemoteClient');

  beforeEach(function () {
    this.socket = {
      id: 1234,
      on: _.noop
    };
    this.client = RemoteClient(this.socket);
  });

  describe(".key(string)", function () {
    it("should translate string representation of a key into a keycode", function () {
      var cl = this.client;
      var keymap = require('../../src/Keymap.js');
      _.forOwn(keymap, function (val, key) {
        expect(cl.key(key)).toEqual(val);
      });
    });

    it("should throw an error when passed an invalid string", function () {
      var cl = this.client;

      expect(function () {
        cl.key('some-invalid-string')
      }).toThrowError();

    });
  });

  describe("Socket forwarders", function () {
    beforeEach(function () {
      this.socket.emit = sinon.stub();
    });

    describe(".addCanvas", function () {
      beforeEach(function () {
        this.client.addCanvas('foreground');
      });

      it("should call emit method on socket", function () {
        expect(this.socket.emit.called).toBeTruthy();
      });

      it("should call pass appropriate arguments to emit", function () {
        expect(this.socket.emit.calledWith('addCanvas', 'foreground')).toBeTruthy();
      });

      it("should be chainable", function () {
        var call_result = this.client.addCanvas('foreground');
        expect(call_result).toEqual(this.client);
      });
    });

    describe(".setControls", function () {
      beforeEach(function () {
        this.client.setControls({ up: 35 });
      });

      it("should call emit method on socket", function () {
        expect(this.socket.emit.called).toBeTruthy();
      });

      it("should call pass appropriate arguments to emit", function () {
        expect(this.socket.emit.calledWith('setControls', { up: 35 })).toBeTruthy();
      });

      it("should be chainable", function () {
        var call_result = this.client.setControls({ up: 35 });
        expect(call_result).toEqual(this.client);
      });
    });

    describe(".render", function () {
      beforeEach(function () {
        this.points = { points: [ [ 32, 43], [ 50, 40 ] ] };
        this.client.render('foreground', this.points);
      });

      it("should call emit method on socket", function () {
        expect(this.socket.emit.called).toBeTruthy();
      });

      it("should call pass appropriate arguments to emit", function () {
        var expected_payload = {
          data: this.points,
          canvas: 'foreground'
        };
        expect(this.socket.emit.calledWith('render', expected_payload)).toBeTruthy();
      });

      it("should be chainable", function () {
        var call_result = this.client.render(this.points);
        expect(call_result).toEqual(this.client);
      });
    });

    describe(".on", function () {
      beforeEach(function () {
        spyOn(this.socket, 'on');

        this.someHandler = _.noop;
        this.client.on('keystream', this.someHandler);
      });

      it("should forward event name and handler to socket", function () {
        expect(this.socket.on).toHaveBeenCalled();
        expect(this.socket.on).toHaveBeenCalledWith('keystream', this.someHandler);
      });
    });
  });
});
