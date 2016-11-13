var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var shell = require('gulp-shell');
var browserSync = require('browser-sync').create();

var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

// FILE PATH CONFIG
var jsFiles = [
  'bower_components/what-input/what-input.js',
  'bower_components/foundation-sites/dist/foundation.js',
  'bower_components/vivus/dist/vivus.js',
  'bower_components/photoswipe/dist/photoswipe.js',
  'bower_components/photoswipe/dist/photoswipe-ui-default.js',
  'node_modules/slick-carousel/slick/slick.js',
  'js/modules/*.js',
  'js/*.js'
];
var jsDest = 'js/dist';

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src',
  'bower_components/photoswipe/dist'
];

gulp.task('build-and-serve-jekyll', shell.task(['bundle install; exec jekyll build --watch']));

gulp.task('build-jekyll', shell.task(['bundle install; bundle exec jekyll build']));

gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: '_site/'
    },
    injectChanges: true
  });

  gulp.watch('_site/**/*.html').on('change', browserSync.reload);
  gulp.watch('_site/**/*.js').on('change', browserSync.reload);
});

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths
    })
    .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('build-js', function() {
    return gulp.src(jsFiles)
      // concat
      .pipe(concat('scripts.js'))
      .pipe(gulp.dest(jsDest))
      // uglify
      .pipe(rename('scripts.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(jsDest));
});

gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch(jsFiles, ['build-js']);
});

gulp.task('default', ['build-and-serve-jekyll','sass','build-js','watch','serve']);
gulp.task('build', ['build-jekyll','sass','build-js']);
