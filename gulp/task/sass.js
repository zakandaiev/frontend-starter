import gulp from 'gulp';
import gulpif from 'gulp-if';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import combineMediaQuery from 'postcss-combine-media-query';
import postCss from 'gulp-postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import server from './server.js';
import { isDev, isProd } from '../config/app.js';
import { path } from '../config/path.js';
import { sass as sassConfig, autoprefixer as autoprefixerConfig, cssnano as cssnanoConfig } from '../config/plugin.js';

const sassPlugin = gulpSass(dartSass);

function sass() {
  return gulp.src(path.sass.src, { encoding: false, sourcemaps: isDev })
    .pipe(sassPlugin.sync(sassConfig).on('error', sassPlugin.logError))
    .pipe(
      gulpif(
        isProd,
        postCss([
          combineMediaQuery(),
          autoprefixer(autoprefixerConfig),
          cssnano(cssnanoConfig),
        ]),
      ),
    )
    .pipe(gulp.dest(path.sass.dist, { sourcemaps: isDev }))
    .pipe(server.stream());
}

export default sass;
