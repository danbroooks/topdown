'use strict';

const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const ava = require('gulp-ava');
const SpecReporter  = require('jasmine-spec-reporter');
const istanbul = require('gulp-istanbul');

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

gulp.task('ava', () => {
  return gulp.src('test/**/*.js')
    .pipe(ava({verbose: true}))
});
