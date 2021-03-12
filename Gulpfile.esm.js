import BrowserSync from 'browser-sync';
import haml from 'gulp-ruby-haml';
import sass from 'gulp-sass';
import cssBeautify from 'gulp-cssbeautify';
import htmlBeautify from 'gulp-html-beautify';
import imageMin from 'gulp-imagemin';
import cache from 'gulp-cache';
import del from 'del';


import { src, series, watch, dest, parallel } from 'gulp';

const WATCH_OPTIONS = { delay: 500, events: ['add', 'change'] };
const serve = (done) => {
  BrowserSync.init({
    server: {
      baseDir: 'dist'
    }
  });

  watch('app/*.haml', WATCH_OPTIONS, series(compileHaml, reload));
  watch('app/scss/**/*.scss', WATCH_OPTIONS, series(compileSass, reload));
  watch('app/js/**/*.js', WATCH_OPTIONS, series(moveJs, reload));
  watch('app/fonts/**/*', WATCH_OPTIONS, series(moveFonts, reload));
  watch('app/img/**/*.+(png|jpg|jpeg|gif|svg)', WATCH_OPTIONS, series(moveImages, reload));
  watch(
    'app/**/*',
    { events: 'unlink' },
    series(
      cleanDist,
      parallel(compileHaml, compileSass, moveFonts, moveJs, moveImages),
      reload
    )
  );

  done();
}

const reload = (done) => {
  BrowserSync.reload();
  done();
}

const cleanDist = async (done) => {
  await del.sync('dist/*');
  done();
}

const compileHaml = (done) => {
  src('app/*.haml')
    .pipe(haml({
      doubleQuote: true
    }))
    .pipe(htmlBeautify({
      indent_size: 2
    }))
    .pipe(dest('dist'));

  done();
}

const compileSass = (done) => {
  src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(cssBeautify({
      indent: '  '
    }))
    .pipe(dest('dist/assets/css'));
  done();
}

const moveFonts = (done) => {
  src('app/fonts/**/*')
    .pipe(dest('dist/assets/fonts'));

  done();
}

const moveJs = (done) => {
  src('app/js/**/*.js')
    .pipe(dest('dist/assets/js'));

  done();
}

const moveImages = (done) => {
  src('app/img/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imageMin({
        interlaced: true
      })))
    .pipe(dest('dist/assets/img'));

  done();
}

export default series(
  serve,
  parallel(compileHaml, compileSass, moveFonts, moveJs, moveImages)
);
