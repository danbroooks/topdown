'use strict';
var gulp = require('gulp');

var jasmine = require('./gulp/jasmine');
var sass = require('./gulp/sass');
var b = require('./gulp/browserify');

gulp.task('watch', ['watchify']);

gulp.task('default', ['watch', 'sass']);
