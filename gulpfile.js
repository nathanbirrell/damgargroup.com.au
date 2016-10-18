var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var shell = require('gulp-shell');
var browserSync = require('browser-sync').create();

var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

// FILE PATH CONFIG
var jsFiles = [
  'js/*.js',
  'js/modules/*.js'
];
var jsDest = 'js/dist';

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src',
  'bower_components/photoswipe/dist'
];

gulp.task('build', shell.task(['bundle exec jekyll build --watch']));

gulp.task('serve', function () {
  browserSync.init({server: {baseDir: '_site/'}});
  // browserSync.init({proxy: 'http://damgargroup.dev'});
  // Reloads page when some of the already built files changed:
  gulp.watch('_site/**/*.*').on('change', browserSync.reload);
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

gulp.task('default', ['build','sass','build-js','watch','serve']);
