var fs = require('fs');
var join = require("path").join;

var FileSystem = function () {};

FileSystem.prototype.find = function (path, opts) {
  var self = this;
  var location = opts.paths.shift();
  var file = join(location, path);
  this.exists(file, function () {
    fs.readFile(file, "binary", function (err, contents) {
      opts.success(file, contents);
    });
  }, function () {
    if (opts.paths.length) {
      self.find(path, opts);
    } else {
      opts.failure();
    }
  });
};

FileSystem.prototype.exists = function (path, success, failure) {

  fs.exists(path, function (exists) {
    if (exists) {
      success();
    } else {
      failure();
    }
  });
};

var Factory = function () {
  return new FileSystem();
};

Factory.Constructor = FileSystem;

Factory.Root = join(__dirname, '..', '..', 'public');

Factory.Project = join(process.cwd(), 'public');

module.exports = Factory;
