
var fs = require('fs');
var join = require("path").join;

var FileSystem = function(){};

FileSystem.prototype.find = function (path, locations, success, failure) {
  var self = this;
  var location = locations.shift();
  var file = join(location, path);
  this.exists(file, function () {
    fs.readFile(file, "binary", function (err, contents) {
      success(file, contents);
    });
  }, function () {
    if (locations.length) {
      self.find(path, locations, success, failure);
    } else {
      failure();
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

var Factory = function(){
  return new FileSystem();
};

Factory.Constructor = FileSystem;

Factory.Root = join(__dirname, '..', '..', 'public');

Factory.Project = join(process.cwd(), 'public');

module.exports = Factory;
