var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var connect = require('gulp-connect');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');

function handleError(task) {
  return function(err) {
    gutil.log(gutil.colors.red(err));
    notify.onError(task + ' failed, check the logs..')(err);
  };
}

function scripts(watch) {
  var bundler, rebundle;
  bundler = browserify({
    basedir: __dirname,
    debug: true,
    entries: './src/js/app.js',
    cache: {},
    packageCache: {},
    fullPaths: watch
  });
  if(watch) {
    bundler = watchify(bundler);
  }
 
  bundler.transform(reactify);
  //bundler.transform({global: true}, envify);
 
  //if(production) {
   // bundler.transform({global: true}, uglifyify);
  //}
 
  rebundle = function() {
    console.log('Beginning rebundle...');
    var stream = bundler.bundle();
    stream.on('error', handleError('Browserify'));
 
    stream = stream.pipe(source('bundle.js'));
 
    /*if(production) {
      stream.pipe(gStreamify(uglify()));
    }*/
    console.log('Rebundle complete.');
 
    return stream.pipe(gulp.dest('./build'));
  };
  bundler.on('update', rebundle);
  return rebundle();
}

function styles() {
  var stream = gulp.src('./src/assets/scss/styles.scss')
    .pipe(plumber())
    .pipe(sass()).on('error',handleError('SCSS'))
    .pipe(gulp.dest('./build/assets/css'))

  return stream;
}

gulp.task('connect', function() {
	connect.server({
		root: './',
		livereload: true
	});
});

gulp.task('watchScripts', function() {
  return scripts(true);
});

gulp.task('watchSCSS', function() {
  return watch('./src/assets/scss/styles.scss', function() {
    return styles()
  });
});

gulp.task('default', ['watchScripts', 'watchSCSS', 'connect']);