'use strict';
var gulp = require('gulp');

var jasmine = require('./gulp/jasmine');
var b = require('./gulp/browserify');

var watchify = require('watchify');

gulp.task('watch', function(){
  b = watchify(b);
  gulp.start('default');
});

gulp.task('default', ['build']);
