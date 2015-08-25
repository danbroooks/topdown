'use strict';
var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var SpecReporter  = require('jasmine-spec-reporter');
var istanbul = require('gulp-istanbul');

function jasmineTask() {
  return gulp.src(['spec/**/*.js'])
    .pipe(jasmine({
      reporter: new SpecReporter({
        displayStacktrace: 'summary'
      })
    }));
}

gulp.task('jasmine', jasmineTask);

gulp.task('istanbul', function () {

  return gulp.src(['src/**/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
      jasmineTask()
        .pipe(istanbul.writeReports());
    });

});
