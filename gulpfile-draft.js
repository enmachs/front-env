var gulp = require('gulp');
var sass = require('gulp-sass');
var haml = require('gulp-ruby-haml');
var htmlbeautify = require('gulp-html-beautify');
var cssbeautify = require('gulp-cssbeautify');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var merge = require('merge-stream');
var bourbon = require('bourbon').includePaths;

// Initialize server
var browserSync = require('browser-sync').create();
gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
});

// Delete dist folder
gulp.task('clean:dist', function () {
  return del.sync('dist');
});

// Save cache and minify images
gulp.task('images', function () {
  return gulp.src('app/img/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
    .pipe(cache(imagemin({
        interlaced: true
      })))
    .pipe(gulp.dest('dist/assets/img'))
});


// Move fonts to dist/fonts
gulp.task('fonts', function () {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/assets/fonts'))
});

// Move new .css files
gulp.task('css', function () {
  return gulp.src('app/css/**/*.css')
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('js', function () {
  return gulp.src('app/js/**/*.js')
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Compile .scss to .css
gulp.task('compile_sass', function () {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass({
      includePaths: [bourbon]
    })) // Converts Sass to CSS with gulp-sass
    .pipe(cssbeautify({
      indent: '  '
    }))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('compile_haml', function ()  {
  return gulp.src('app/*.haml')
    .pipe(haml({doubleQuote: true})) // Converts Haml to HTML with gulp-haml
    .pipe(htmlbeautify({
      "indent_size": 2,
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Watch function
gulp.task('default', ['browserSync', 'compile_haml', 'compile_sass', 'css', 'js'], function () {
  gulp.watch('app/scss/**/*.scss', ['compile_sass']);
  gulp.watch('app/**/*.haml', ['compile_haml']);
  gulp.watch('app/css/*.+(css|min.css)', ['css']);
  gulp.watch('app/js/**/*.js', ['js']);
  gulp.watch('app/img/**/*.+(png|jpg|jpeg|gif|svg)', browserSync.reload);
});

gulp.task('set', function () {
  runSequence('clean:dist',
    ['compile_haml','compile_sass', 'images', 'fonts', 'css', 'js']
  )
});
