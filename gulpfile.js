var gulp = require('gulp')
var plumber = require('gulp-plumber')
var rename = require('gulp-rename')
var browserify = require('gulp-browserify')
var mochaPhantomJS = require('gulp-mocha-phantomjs')

gulp.task('js-test', function () {
    return gulp.src('test/index.js', {read: false})
        .pipe(plumber())
        .pipe(browserify())
        .pipe(rename('bundle-test.js'))
        .pipe(gulp.dest('build'))
})

gulp.task('test', ['js-test'], function () {
    return gulp.src('test/runner.html')
        .pipe(plumber())
        .pipe(mochaPhantomJS({reporter: 'dot'}))
})

gulp.task('default', ['test'])
