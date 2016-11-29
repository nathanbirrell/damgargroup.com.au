var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var path = require('path')
var shell = require('gulp-shell');
var browserSync = require('browser-sync').create();

var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');

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

gulp.task('html', ['jekyll'], function() {
    // --> Minhtml
    gulp.src([
            path.join('_site/', '*.html'),
            path.join('_site/', '*/*/*.html'),
            path.join('_site/', '*/*/*/*.html')
        ])
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('_site/'))
        .pipe(browserSync.reload({
            stream: true,
            once: true
        }));
});

gulp.task('jekyll', [], function (gulpCallBack){
    var spawn = require('child_process').spawn;
    // After build: cleanup HTML
    var jekyll = spawn('jekyll', ['build'], {stdio: 'inherit'});

    jekyll.on('exit', function(code) {
        gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: '+code);
    });
});

gulp.task('build-jekyll', shell.task(['bundle install; bundle exec jekyll build --config _config.yml,_config-prod.yml']));

gulp.task('build-sass', function() {
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
    .pipe(gulp.dest(jsDest))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('serve', function() {
  browserSync.init(null, {
      server: {
          baseDir: "./" + '_site/',
          injectChanges: true
      },
      // logFileChanges: true,
      // logLevel: 'debug',
      open: true        // Toggle to automatically open page when starting.
  });

  gulp.watch('scss/**/*.scss', ['build-sass']);

  gulp.watch(jsFiles, ['build-js']);

  // images are built as part of the Jekyll process
  gulp.watch('img/**/*', ['html']);
  gulp.watch('project-photos/**/*', ['html']);

  gulp.watch(['_config.yml'], ['html']);
  gulp.watch(['_posts/**/*.+(md|markdown|MD)'], ['html']);
  gulp.watch(['**/*.+(html|md|markdown|MD)', '!_site/**/*.*'], ['html']);
});

gulp.task('default', ['html','build-sass','build-js','serve']);

gulp.task('build', ['build-jekyll','build-sass','build-js']);
