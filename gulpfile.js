import { processArg } from '#core/app.js';
import del from '#core/del.js';
import font from '#core/font.js';
import img from '#core/img.js';
import js from '#core/js.js';
import { path } from '#core/path.js';
import publicFiles from '#core/public-files.js';
import sass from '#core/sass.js';
import { reload, serve } from '#core/server.js';
import twig from '#core/twig.js';
import gulp from 'gulp';

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
const build = compileFiles();
const preview = startServer();

export {
  build,
  del,
  dev,
  font,
  img,
  js,
  preview,
  publicFiles,
  sass,
  serve,
  twig,
};

export default processArg.build ? build : dev;
