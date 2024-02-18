import gulp from 'gulp';
import gulpif from 'gulp-if';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import combineMediaQuery from 'postcss-combine-media-query';
import postCss from 'gulp-postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import {
  isProd, isDev, path, plugin,
} from '../config.js';

const sassPlugin = gulpSass(dartSass);

function sass() {
  return gulp.src(path.sass.src, { sourcemaps: isDev })
    .pipe(sassPlugin.sync(plugin.sass).on('error', sassPlugin.logError))
    .pipe(
      gulpif(
        isProd,
        postCss([
          combineMediaQuery(),
          autoprefixer(plugin.autoprefixer),
          cssnano(plugin.cssnano),
        ]),
      ),
    )
    .pipe(gulp.dest(path.sass.dist, { sourcemaps: isDev }))
    .pipe(browserSync.stream());
}

export default sass;
