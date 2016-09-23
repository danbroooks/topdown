'use strict'

var fs = require('fs');
var join = require("path").join;

module.exports = () => {
  let find = (path, opts) => {
    var location = opts.paths.shift();
    var file = join(location, path);
    exists(file, () => {
      fs.readFile(file, "binary", (err, contents) => {
        opts.success(file, contents);
      });
    }, () => {
      if (opts.paths.length) {
        find(path, opts);
      } else {
        opts.failure();
      }
    });
  };

  let exists = (path, success, failure) => {
    fs.exists(path, (doesExist) => {
      if (doesExist) {
        success();
      } else {
        failure();
      }
    });
  };

  return Object.freeze({ find, exists });
};

module.exports.Root = join(__dirname, '..', '..', 'public');

module.exports.Project = join(process.cwd(), 'public');
