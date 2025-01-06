import gulp from 'gulp';
import { isProd } from './gulp/config/app.js';
import { path } from './gulp/config/path.js';
import del from './gulp/task/del.js';
import font from './gulp/task/font.js';
import img from './gulp/task/img.js';
import js from './gulp/task/js.js';
import publicFiles from './gulp/task/public-files.js';
import sass from './gulp/task/sass.js';
import twig from './gulp/task/twig.js';
import { reload, serve } from './gulp/task/server.js';

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
