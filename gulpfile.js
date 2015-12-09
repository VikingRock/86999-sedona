'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    plumber = require('gulp-plumber'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    concat = require('gulp-concat'),
    runSequence = require('run-sequence'),
    connect = require('gulp-connect');

// Web server
gulp.task('connect', function() {
  connect.server({
    root:'./',
    livereload: true,
    port: 8080
  })
});

// reload page
gulp.task('html', function () {
 gulp.src('./*.html')
    .pipe(connect.reload());
});

// css
gulp.task('style', function() {
  return gulp.src('less/style.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer({browsers: 'last 2 versions'})
    ]))
    .pipe(gulp.dest('css'))
    .pipe(connect.reload());
});

//js build
gulp.task('scripts', function() {
  return gulp.src(['./js/*.js', '!./js/script.js'])
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./js/'))
    .pipe(connect.reload());
});

// watch
gulp.task('watch', function() {
  gulp.watch('less/**/*.less', ['style']);
  gulp.watch('js/*.js', ['scripts']);
  gulp.watch(['./*.html'], ['html']);
});

// gulp  (собираем проект и запускаем watch)
gulp.task('default', function() {
  runSequence(
    'style',
    'scripts',
    'connect',
    'watch'
  );
});

// Оставьте эту строку в самом конце файла
require('./.gosha');
