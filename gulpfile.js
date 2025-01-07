import gulp from 'gulp';
import { isProd } from './gulp/app.js';
import { path } from './gulp/path.js';
import del from './gulp/del.js';
import font from './gulp/font.js';
import img from './gulp/img.js';
import js from './gulp/js.js';
import publicFiles from './gulp/public-files.js';
import sass from './gulp/sass.js';
import twig from './gulp/twig.js';
import { reload, serve } from './gulp/server.js';

function watch() {
  gulp.watch(path.font.watch, gulp.series(font, reload));
  gulp.watch(path.img.watch, gulp.series(img, reload));
  gulp.watch(path.js.watch, gulp.series(js, reload));
  gulp.watch(path.public.watch, gulp.series(publicFiles, reload));
  gulp.watch(path.sass.watch, sass);
  gulp.watch(path.twig.watch, gulp.series(twig, reload));
}

function compileFiles() {
  return gulp.series(
    del,
    gulp.parallel(font, img, js, publicFiles, sass, twig),
  );
}

function startServer() {
  return gulp.parallel(serve, watch);
}

function startDevServer() {
  return gulp.series(
    compileFiles(),
    startServer(),
  );
}

const dev = startDevServer();
const prod = compileFiles();
const build = compileFiles();
const preview = startServer();

export {
  del,
  font,
  img,
  js,
  publicFiles,
  sass,
  serve,
  twig,

  dev,
  prod,
  build,
  preview,
};

export default isProd ? prod : dev;
