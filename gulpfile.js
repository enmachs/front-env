var gulp = require('gulp');
var sass = require('gulp-sass');
var haml = require('gulp-haml');
var htmlbeautify = require('gulp-html-beautify');

//initialize server
var browserSync = require('browser-sync').create();
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
})

//Compile .scss to .css
gulp.task('compile_sass', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('compile_haml', function(){
  return gulp.src('app/*.haml')
    .pipe(haml()) // Converts Haml to HTML with gulp-haml
    .pipe(htmlbeautify({
      "indent_size": 2,
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
});


//Watch function
gulp.task('watch', ['browserSync', 'compile_haml', 'compile_sass'], function(){
  gulp.watch('app/scss/**/*.scss', ['compile_sass']);
  gulp.watch('app/*.haml', ['compile_haml']);
  gulp.watch('app/js/**/*.js', browserSync.reload) 
  // Other watchers
})