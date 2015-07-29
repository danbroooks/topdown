
var sinon = require('sinon');
var proxyquire = require('proxyquire');

var fsMock = {};

var FileSystem = proxyquire('../../src/server/FileSystem', {
  'fs': fsMock
});

describe("FileSystem", function() {

  describe("Factory", function () {
    it("should return new instance", function () {
      expect(FileSystem() instanceof FileSystem.Constructor).toBeTruthy();
    });
  });

  describe(".find(path, success, failure)", function() {

    var fs = FileSystem();

    function returns(value) {
      return function(path, cb) {
        return cb(value);
      };
    }

    beforeEach(function(){
      this.success = sinon.spy();
      this.failure = sinon.spy();
    });

    it('should execute success callback on success', function () {
      fsMock.exists = returns(true);
      fs.find('/index.html', this.success, this.failure);
      expect(this.success.called).toBeTruthy();
      expect(this.failure.called).toBeFalsy();
    });

    it('should execute failure callback on failure', function () {
      fsMock.exists = returns(false);
      fs.find('/index.html', this.success, this.failure);
      expect(this.success.called).toBeFalsy();
      expect(this.failure.called).toBeTruthy();
    });
  });

});
