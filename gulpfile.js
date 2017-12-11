var gulp = require('gulp');
var sass = require('gulp-sass');
var haml = require('gulp-haml');
var htmlbeautify = require('gulp-html-beautify');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var uncss = require('uncss');
var merge = require('merge-stream');
//initialize server
var browserSync = require('browser-sync').create();
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
})


//Delete dist folder
gulp.task('clean:dist', function() {
  return del.sync('dist');
})

gulp.task('add_bootstrap', function(){
  var bootstrap_js = gulp.src('node_modules/bootstrap/dist/js/bootstrap.js')
  .pipe(gulp.dest('app/js'));

  var bootstrap_css = gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
  .pipe(gulp.dest('app/css'));

  return merge(bootstrap_js, bootstrap_css)
});



//Save cache and minify images
gulp.task('images', function(){
  return gulp.src('app/img/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/img'))
});

gulp.task('clean-css', function(){
  var files = 'dist/*.html',
  options = {
    csspath: '',
    stylesheets: ['css/main.css'],
    htmlroot: 'dist',
  };
  return uncss(files, options, function (error, output) {
    gulp.dest('dist/css/main.css')
  });
});

//Move fonts to dist/fonts
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});
//Move new .css files
gulp.task('css', function() {
  return gulp.src('app/css/**/*.css')
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.reload({
    stream: true
  }))
});

gulp.task('js', function() {
  return gulp.src('app/js/**/*.js')
  .pipe(gulp.dest('dist/js'))
  .pipe(browserSync.reload({
    stream: true
  }))
});

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
gulp.task('watch', ['browserSync', 'compile_haml', 'compile_sass', 'css', 'js'], function(){
  gulp.watch('app/scss/**/*.scss', ['compile_sass']);
  gulp.watch('app/*.haml', ['compile_haml']);
  gulp.watch('app/css/*.+(css|min.css)', ['css']);
  gulp.watch('app/js/**/*.js', browserSync.reload)
  gulp.watch('app/img/**/*.+(png|jpg|jpeg|gif|svg)', browserSync.reload) 
  // Other watchers
});


gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['compile_haml','compile_sass', 'images', 'fonts', 'css', 'js']
  )
});

gulp.task('default', function (callback) {
  runSequence(['compile_haml', 'compile_sass', 'css', 'js', 'browserSync', 'watch']
  )
});