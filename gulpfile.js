"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var del = require('del');

gulp.task("style", function() {
  return gulp.src("less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer({browsers: "last 2 versions"})
    ]))
    .pipe(gulp.dest("css"));
});

gulp.task("start", ["style", "scripts"], function() {
  gulp.watch("less/**/*.less", ["style"]);
  gulp.watch("js/*.js", ["scripts"]);
});

gulp.task('scripts-clear', function() {
  return del(['./js/script.js']);
});

gulp.task('scripts-build', function() {
  return gulp.src(['./js/*.js','!./js/script.js'])
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./js/'));
});

gulp.task('scripts', function() {
  runSequence(
    'scripts-clear',
    'scripts-build'
  );
});

// Оставьте эту строку в самом конце файла
require("./.gosha");
