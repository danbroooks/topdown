'use strict';
var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var assign = require('lodash/object/assign');

var extenalDependencies = [
];

var opts = assign(watchify.args, {
  debug: true
});

function bundler(dest, b) {

  return b.bundle()
    .pipe(source(dest))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify())
      .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public'));
};

function topdown() {
  var b = browserify(assign(opts, {
    entries: ['./client.js']
  }));

  b.external(extenalDependencies);
  return b;
};

function externals() {
  var b = browserify(opts);
  b.require(extenalDependencies);
  return b;
};

gulp.task('bundle', function () {
  return bundler('topdown.js', topdown());
});

gulp.task('bundle-externals', function () {
  return bundler('externals.js', externals());
});

gulp.task('watchify', function () {
  var b = topdown();
  var w = watchify(b);
  function update() {
    return bundler('topdown.js', w);
  }
  w.on('update', update);
  w.on('log', gutil.log);
  return update();
});

gulp.task('build', [ 'bundle', 'bundle-externals' ]);

