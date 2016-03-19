describe("RemoteClient", function () {

  var _ = require('lodash');
  var sinon = require('sinon');
  var RemoteClient = require('../../src/server/RemoteClient');

  describe("Factory", function () {
    it("should return new instance", function () {
      expect(RemoteClient({
        id: 1234
      }) instanceof RemoteClient.Constructor).toBeTruthy();
    });

    it("should gain id of socket passed", function () {
      expect(RemoteClient({
        id: 1234
      }).id).toEqual(1234);
    });
  });

  describe(".key(string)", function () {
    it("should translate string representation of a key into a keycode", function () {
      var cl = RemoteClient({
        id: 1234
      });
      var keymap = require('../../src/Keymap.js');
      _.forOwn(keymap, function (val, key) {
        expect(cl.key(key)).toEqual(val);
      });
    });

    it("should throw an error when passed an invalid string", function () {
      var cl = RemoteClient({
        id: 1234
      });

      expect(function () {
        cl.key('some-invalid-string')
      }).toThrowError();

    });
  });

  describe("Socket forwarders", function () {
    beforeEach(function () {
      this.socket = {id: 1234};
      this.socket.emit = sinon.stub();
    });

    describe(".addCanvas", function () {
      beforeEach(function () {
        RemoteClient(this.socket).addCanvas('foreground');
      });

      it("should call emit method on socket", function () {
        expect(this.socket.emit.called).toBeTruthy();
      });

      it("should call pass appropriate arguments to emit", function () {
        expect(this.socket.emit.calledWith('addCanvas', 'foreground')).toBeTruthy();
      });

      it("should be chainable", function () {
        var call_result = RemoteClient(this.socket).addCanvas('foreground');
        expect(call_result instanceof RemoteClient.Constructor).toBeTruthy();
      });
    });

    describe(".setControls", function () {
      beforeEach(function () {
        RemoteClient(this.socket).setControls({ up: 35 });
      });

      it("should call emit method on socket", function () {
        expect(this.socket.emit.called).toBeTruthy();
      });

      it("should call pass appropriate arguments to emit", function () {
        expect(this.socket.emit.calledWith('setControls', { up: 35 })).toBeTruthy();
      });

      it("should be chainable", function () {
        var call_result = RemoteClient(this.socket).setControls({ up: 35 });
        expect(call_result instanceof RemoteClient.Constructor).toBeTruthy();
      });
    });

    describe(".render", function () {
      beforeEach(function () {
        this.points = { points: [ [ 32, 43], [ 50, 40 ] ] };
        RemoteClient(this.socket).render('foreground', this.points);
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
        var call_result = RemoteClient(this.socket).render(this.points);
        expect(call_result instanceof RemoteClient.Constructor).toBeTruthy();
      });
    });

    describe(".on", function () {
      beforeEach(function () {
        this.socket = { on: _.noop };
        spyOn(this.socket, 'on');

        this.someHandler = function () {};
        RemoteClient(this.socket).on('keystream', this.someHandler);
      });

      it("should forward event name and handler to socket", function () {
        expect(this.socket.on).toHaveBeenCalled();
        expect(this.socket.on).toHaveBeenCalledWith('keystream', this.someHandler);
      });
    });
  });
});
