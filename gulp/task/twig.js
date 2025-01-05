import gulp from 'gulp';
import gulpTwig from 'gulp-twig';
import gulpif from 'gulp-if';
import versionNumber from 'gulp-version-number';
import htmlmin from 'gulp-htmlmin';
import browserSync from 'browser-sync';
import { isProd } from '../config/app.js';
import { path } from '../config/path.js';
import { twig as twigConfig, versionNumber as versionNumberConfig, htmlmin as htmlminConfig } from '../config/plugin.js';

function twig() {
  return gulp.src(path.twig.src)
    .pipe(gulpTwig(twigConfig))
    .pipe(
      gulpif(
        isProd,
        versionNumber(versionNumberConfig),
      ),
    )
    .pipe(
      gulpif(
        isProd,
        htmlmin(htmlminConfig),
      ),
    )
    .pipe(gulp.dest(path.twig.dist))
    .pipe(browserSync.stream());
}

export default twig;
