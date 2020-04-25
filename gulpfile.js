const bourbon = require('bourbon').includePaths
const cache = require('gulp-cache')
const cssbeautify = require('gulp-cssbeautify')
const del = require('del')
const { task, series, src, dest, parallel, watch } = require('gulp')
const htmlbeautify = require('gulp-html-beautify')
const imagemin = require('gulp-imagemin')
const sass = require('gulp-sass')
const slim = require('gulp-slim')

// Initialize hotreload server
const browserSync = require('browser-sync').create()

function reload(done) {
  browserSync.reload();
  done();
}

const server = function () {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

// Delete dist folder
const clean = async function () {
  const deleted = await del('dist')
  console.log('files deleted ', deleted)
}

// Save cache and minify images
const images = function () {
  return src('app/img/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(dest('dist/assets/img'))
}

// Move fonts to dist/fonts
const fonts = function () {
  return src('app/fonts/**/*')
    .pipe(dest('dist/assets/fonts'))
}

// Move new .css files
const css = function () {
  return src('app/css/**/*.css')
    .pipe(dest('dist/assets/css'))
}

// Move new .js files
const js = function () {
  return src('app/js/**/*.js')
    .pipe(dest('dist/assets/js'))
}

// Compile .scss to .css
const compile_sass = function () {
  return src('app/scss/**/*.scss')
    .pipe(sass({
      includePaths: [bourbon]
    })) // Converts Sass to CSS with sass
    .pipe(cssbeautify({
      indent: '  '
    }))
    .pipe(dest('dist/assets/css'))
}

// Compile .slim files into .html
const compile_slim = function () {
  return src('app/*.slim')
    .pipe(slim({
      pretty: true,
      include: true,
      options: "include_dirs=['app/partials/']"
    }))
    .pipe(htmlbeautify({
      indent_size: 2
    }))
    .pipe(dest('dist'))
}

const watches = function (done) {
  server()
  watch('app/**/*.slim', series(compile_slim, reload))
  watch('app/scss/**/*.scss', series(compile_sass, reload))
  watch('app/css/*.+(css|min.css)', series(css, reload))
  watch('app/js/**/*.js', series(js, reload))
  watch('app/img/**/*.+(png|jpg|jpeg|gif|svg)', series(images, reload))
  done()
}

// Watch function
task('default', series(compile_slim, compile_sass, css, js, watches))

task('set',
  series(clean,
    parallel(compile_slim, compile_sass, images, fonts, css, js)
  )
)
