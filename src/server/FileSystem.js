
var fs = require('fs');

var FileSystem = function(){};

FileSystem.prototype.find = function (path, success, failure) {
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
