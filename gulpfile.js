var bourbon = require('bourbon').includePaths;
var cache = require('gulp-cache');
var cssbeautify = require('gulp-cssbeautify');
var del = require('del');
var gulp = require('gulp');
var htmlbeautify = require('gulp-html-beautify');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var slim = require("gulp-slim");
var runSequence = require('run-sequence');

// Initialize hotreload server
var browserSync = require('browser-sync').create();
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
})

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

// Move new .js files
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

// Compile .slim files into .html
gulp.task('compile_slim', function () {
  return gulp.src('app/*.slim')
    // .pipe(haml({doubleQuote: true})) // Converts Haml to HTML with gulp-haml
    .pipe(slim({
      pretty: true,
      include: true,
      options: "include_dirs=['app/partials/']"
    }))
    .pipe(htmlbeautify({
      "indent_size": 2,
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Watch function
gulp.task('default', ['browserSync', 'compile_slim', 'compile_sass', 'css', 'js'], function () {
  gulp.watch('app/scss/**/*.scss', ['compile_sass']);
  gulp.watch('app/**/*.slim', ['compile_slim']);
  gulp.watch('app/css/*.+(css|min.css)', ['css']);
  gulp.watch('app/js/**/*.js', ['js']);
  gulp.watch('app/img/**/*.+(png|jpg|jpeg|gif|svg)', browserSync.reload);

  // Other watchers
});

gulp.task('set', function (callback) {
  runSequence('clean:dist',
    ['compile_slim','compile_sass', 'images', 'fonts', 'css', 'js']
  )
});
