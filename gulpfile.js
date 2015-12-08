"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var concat = require('gulp-concat');

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

gulp.task('scripts', function() {
  return gulp.src('./js/*.js',!'./js/script.js')
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./js/'));
});


// Оставьте эту строку в самом конце файла
require("./.gosha");
