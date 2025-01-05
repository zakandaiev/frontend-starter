import gulp from 'gulp';
import browserSync from 'browser-sync';
import { isProd } from './gulp/config/app.js';
import { path } from './gulp/config/path.js';
import del from './gulp/task/del.js';
import font from './gulp/task/font.js';
import img from './gulp/task/img.js';
import js from './gulp/task/js.js';
import publicFiles from './gulp/task/public-files.js';
import sass from './gulp/task/sass.js';
import server from './gulp/task/server.js';
import twig from './gulp/task/twig.js';

function watch() {
  gulp.watch(path.font.watch, font).on('change', browserSync.reload);
  gulp.watch(path.img.watch, img).on('change', browserSync.reload);
  gulp.watch(path.js.watch, js).on('change', browserSync.reload);
  gulp.watch(path.public.watch, publicFiles).on('change', browserSync.reload);
  gulp.watch(path.sass.watch, sass);
  gulp.watch(path.twig.watch, twig).on('change', browserSync.reload);
}

function compileFiles() {
  return gulp.series(
    del,
    gulp.parallel(font, img, js, publicFiles, sass, twig),
  );
}

function startServer() {
  return gulp.parallel(server, watch);
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
  server,
  twig,

  dev,
  prod,
  build,
  preview,
};

export default isProd ? prod : dev;
