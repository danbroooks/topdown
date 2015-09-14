describe("FileSystem", function () {

  var sinon = require('sinon');
  var proxyquire = require('proxyquire');

  var fsMock = {};

  var FileSystem = proxyquire('../../src/server/FileSystem', {
    'fs': fsMock
  });

  beforeEach(function () {
    this.success = sinon.spy();
    this.failure = sinon.spy();
  });

  afterEach(function () {
    this.success.reset();
    this.failure.reset();
  });

  describe("Factory", function () {
    it("should return new instance", function () {
      expect(FileSystem() instanceof FileSystem.Constructor).toBeTruthy();
    });
  });

  describe(".exists(path, success, failure)", function () {

    var fs = FileSystem();

    function returns(value) {
      return function (path, cb) {
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

  describe(".find(path, opts)", function () {

    var fs = FileSystem();
    var join = require("path").join;
    var opts;

    beforeAll(function () {
      fsMock.exists = function (path, cb) {
        var validPaths = [
          join('core', 'index.html'),
          join('project', 'script.js'),
          join('core', 'script.js')
        ];

        var exists = (validPaths.indexOf(path) !== -1);
        cb(exists);
      };

      fsMock.readFile = function (path, o, cb) {
        cb(path, 'hello world');
      };
    });

    beforeEach(function () {
      opts = {};
      opts.success = this.success;
      opts.failure = this.failure;
    });

    it('should look in multiple locations for files', function () {
      opts.paths = ['project', 'core'];
      fs.find('index.html', opts);
      expect(this.success.called).toBeTruthy();
      expect(this.failure.called).toBeFalsy();

      opts.paths = ['project', 'core'];
      fs.find('script.js', opts);
      expect(this.success.calledTwice).toBeTruthy();
      expect(this.failure.called).toBeFalsy();
    });

    it('should execute failure callback if file not found', function () {
      opts.paths = ['project', 'core'];
      fs.find('styles.css', opts);
      expect(this.success.called).toBeFalsy();
      expect(this.failure.called).toBeTruthy();
    });

    it('should trigger failure callback with an error object passed to it', function () {
      opts.paths = ['project', 'core'];
      fs.find('styles.css', opts);
      expect(
        this.failure.calledWith({
          status: 'notfound'
        })
      ).toBeTruthy();
    });

    it('should prefer the result from the location that comes first in the array', function () {
      opts.paths = ['project', 'core'];
      fs.find('script.js', opts);
      expect(
        this.success.calledWith(join('project', 'script.js'))
      ).toBeTruthy();
    });

    it('should pass contents of file to callback on success', function () {
      opts.paths = ['core'];
      fs.find('script.js', opts);
      expect(this.success.calledWith(join('core', 'script.js'), 'hello world')).toBeTruthy();
    });

  });

});
