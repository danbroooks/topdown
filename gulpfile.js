'use strict';
var gulp = require('gulp');

var jasmine = require('./gulp/jasmine');
var b = require('./gulp/browserify');

gulp.task('watch', ['watchify']);

gulp.task('default', ['watch']);
