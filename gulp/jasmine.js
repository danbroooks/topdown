'use strict';
var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var SpecReporter  = require('jasmine-spec-reporter');

gulp.task('jasmine', function () {
  return gulp.src('spec/**/*.js')
    .pipe(jasmine({
      reporter: new SpecReporter()
    }));
});
