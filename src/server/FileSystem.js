'use strict'

var fs = require('fs');
var join = require('path').join;

let exists = (path, success, failure) => {
  fs.exists(path, (doesExist) => {
    if (doesExist) {
      success();
    } else {
      failure();
    }
  });
};

let read = (path, then) => {
  fs.readFile(path, 'binary', (err, contents) => {
    if (err) {
      throw new Error(err);
    }

    then(contents, path);
  });
};

let readifexists = (path, cb, fail) => {
  let success = () => read(path, cb);
  exists(path, success, fail);
};

let find = (path, opts) => {
  var location = opts.paths.shift();
  var file = join(location, path);

  readifexists(file, (contents, path) => {
    opts.success(path, contents);
  }, () => {
    if (opts.paths.length) {
      find(path, opts);
    } else {
      opts.failure();
    }
  });
};

module.exports = () => {
  return Object.freeze({ find, exists });
};

module.exports.Root = join(__dirname, '..', '..', 'public');

module.exports.Project = join(process.cwd(), 'public');
