'use strict';
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var streamify   = require('gulp-streamify');
var watchify = require('watchify');
var assign = require('lodash/object/assign');

var opts = assign({}, watchify.args, {
  debug: true,
  entries: ['./src/client/Client.js']
});

var b = browserify(opts);

function bundle() {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('./app.js'))
    .pipe(streamify(uglify()))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public'));
}

gulp.task('build', bundle);
b.on('update', bundle);
b.on('log', gutil.log);

module.exports = b;

