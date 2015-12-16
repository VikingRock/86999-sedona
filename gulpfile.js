'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    plumber = require('gulp-plumber'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    concat = require('gulp-concat'),
    runSequence = require('run-sequence'),
    connect = require('gulp-connect'),
    rename = require("gulp-rename"),
    minify = require("gulp-minify-css"),
    uglify = require('gulp-uglify'),
    imageop = require('gulp-image-optimization'),
    clean = require('gulp-clean');

var jsLibs = [
  './bower_components/moment/min/moment-with-locales.min.js',
  './bower_components/tap/dist/tap.min.js',
  './bower_components/mustache.js/mustache.min.js',
  './source/js/*.js'
]

var imageArr = [
  './source/img/**/*.png',
  './source/img/**/*.jpg',
  './source/img/**/*.jpeg',
  './source/img/**/*.gif'
]

//clean build
gulp.task('clean', function () {
  return gulp.src('./build/*', {read: false})
    .pipe(clean());
});

//copy files to build
gulp.task('copy', function () {
  gulp.src(['./source/img/*.svg', './source/img/*.ico'])
    .pipe(gulp.dest('./build/img/'))
  gulp.src('./source/*.html')
    .pipe(gulp.dest('./build/'))
  gulp.src('./source/font/*')
    .pipe(gulp.dest('./build/font'))
});

// Web server
gulp.task('connect', function() {
  connect.server({
    root:'./build/',
    livereload: true,
    port: 8080
  })
});

// reload page
gulp.task('html', function () {
 gulp.src('./build/*.html')
    .pipe(connect.reload());
});

// css
gulp.task('style', function() {
  return gulp.src('./source/less/style.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer({browsers: 'last 2 versions'})
    ]))
    .pipe(gulp.dest('./build/css'))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest('./build/css'))
    .pipe(connect.reload());
});

//js build
gulp.task('scripts', function() {
  return gulp.src(jsLibs)
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./build/js/'))
    .pipe(uglify())
    .pipe(rename('script.min.js'))
    .pipe(gulp.dest('./build/js/'))
    .pipe(connect.reload());
});

//images
gulp.task('images', function(cb) {
  gulp.src(imageArr).pipe(imageop({
    optimizationLevel: 3,
    progressive: true,
    interlaced: true
  }))
    .pipe(gulp.dest('./build/img')).on('end', cb).on('error', cb);
});

// watch
gulp.task('watch', function() {
  gulp.watch('./source/less/**/*.less', ['style']);
  gulp.watch('./source/js/*.js', ['scripts']);
  gulp.watch(['./source/*.html'], ['html']);
});

// gulp  (собираем проект и запускаем watch)
gulp.task('default', function() {
  runSequence(
    'clean',
    'copy',
    'style',
    'scripts',
    'images',
    'connect',
    'watch'
  );
});

// Оставьте эту строку в самом конце файла
require('./.gosha');
