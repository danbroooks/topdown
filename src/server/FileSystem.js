'use strict'

const fs = require('fs');
const join = require('path').join;

const exists = (path, success, failure) => {
  fs.exists(path, (doesExist) => {
    if (doesExist) {
      success();
    } else {
      failure();
    }
  });
};

const read = (path, then) => {
  fs.readFile(path, 'binary', (err, contents) => {
    if (err) {
      throw new Error(err);
    }

    then(contents, path);
  });
};

const readifexists = (path, cb, fail) => {
  const success = () => read(path, cb);
  exists(path, success, fail);
};

const find = (path, opts) => {
  const location = opts.paths.shift();
  const file = join(location, path);

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

module.exports = () => Object.freeze({ find, exists });

module.exports.Root = join(__dirname, '..', '..', 'public');

module.exports.Project = join(process.cwd(), 'public');
