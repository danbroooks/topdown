
var sinon = require('sinon');
var proxyquire = require('proxyquire');

var fsMock = {};

var FileSystem = proxyquire('../../src/server/FileSystem', {
  'fs': fsMock
});

describe("FileSystem", function() {

  beforeEach(function(){
    this.success = sinon.spy();
    this.failure = sinon.spy();
  });

  describe("Factory", function () {
    it("should return new instance", function () {
      expect(FileSystem() instanceof FileSystem.Constructor).toBeTruthy();
    });
  });

  describe(".exists(path, success, failure)", function() {

    var fs = FileSystem();

    function returns(value) {
      return function(path, cb) {
        return cb(value);
      };
    }

    it('should execute success callback on success', function () {
      fsMock.exists = returns(true);
      fs.exists('/index.html', this.success, this.failure);
      expect(this.success.called).toBeTruthy();
      expect(this.failure.called).toBeFalsy();
    });

    it('should execute failure callback on failure', function () {
      fsMock.exists = returns(false);
      fs.exists('/index.html', this.success, this.failure);
      expect(this.success.called).toBeFalsy();
      expect(this.failure.called).toBeTruthy();
    });
  });

  describe(".find(path, locations, success, failure)", function() {

    var fs = FileSystem();
    var join = require("path").join;

    beforeAll(function(){
      fsMock.exists = function(path, cb) {
        var validPaths = [
          join('core', 'index.html'),
          join('project', 'script.js'),
          join('core', 'script.js')
        ];

        var exists = (validPaths.indexOf(path) !== -1);
        cb(exists);
      };

    });

    it('should look in multiple locations for files', function() {
      fs.find('index.html', ['project', 'core'], this.success, this.failure);
      expect(this.success.called).toBeTruthy();
      expect(this.failure.called).toBeFalsy();

      fs.find('script.js', ['project', 'core'], this.success, this.failure);
      expect(this.success.calledTwice).toBeTruthy();
      expect(this.failure.called).toBeFalsy();
    });

    it('should execute failure callback if file not found', function() {
      fs.find('styles.css', ['project', 'core'], this.success, this.failure);
      expect(this.success.called).toBeFalsy();
      expect(this.failure.called).toBeTruthy();
    });

  });

});
