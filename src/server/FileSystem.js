
var fs = require('fs');
var join = require("path").join;

var FileSystem = function(){};

FileSystem.prototype.find = function (path, locations, success, failure) {
  var self = this;
  var location = locations.shift();
  this.exists(join(location, path), function () {
    success();
  }, function () {
    if (locations.length) {
      self.find(path, locations, success, failure);
    } else {
      failure();
    }
  });
};

FileSystem.prototype.exists = function (path, success, failure) {

  fs.exists(path, function(exists) {
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

module.exports = Factory;
