import gulp from 'gulp';
import gulpTwig from 'gulp-twig';
import gulpif from 'gulp-if';
import versionNumber from 'gulp-version-number';
import htmlmin from 'gulp-htmlmin';
import browserSync from 'browser-sync';
import { isProd, path, plugin } from '../config.js';

function twig() {
  return gulp.src(path.twig.src)
    .pipe(gulpTwig(plugin.twig))
    .pipe(
      gulpif(
        isProd,
        versionNumber(plugin.versionNumber),
      ),
    )
    .pipe(
      gulpif(
        isProd,
        htmlmin(plugin.htmlmin),
      ),
    )
    .pipe(gulp.dest(path.twig.dist))
    .pipe(browserSync.stream());
}

export default twig;
