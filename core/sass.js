import { processArg } from '#core/app.js';
import { absPath, path } from '#core/path.js';
import server from '#core/server.js';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import postCss from 'gulp-postcss';
import gulpSass from 'gulp-sass';
import combineMediaQuery from 'postcss-combine-media-query';
import * as dartSass from 'sass';

const sassPlugin = gulpSass(dartSass);

function sass() {
  return gulp.src(path.sass.src, { encoding: false, sourcemaps: !processArg.isBuild })
    .pipe(sassPlugin
      .sync({
        api: 'modern-compiler',
        loadPaths: [absPath.sass, 'node_modules'],
      })
      .on('error', sassPlugin.logError))
    .pipe(
      gulpif(
        processArg.isBuild,
        postCss([
          combineMediaQuery(),
          autoprefixer({
            cascade: !processArg.isBuild,
            grid: false,
          }),
          cssnano({
            preset: [
              'default',
              {
                discardComments: {
                  removeAll: true,
                },
              },
            ],
          }),
        ]),
      ),
    )
    .pipe(gulp.dest(path.sass.dist, { sourcemaps: !processArg.isBuild }))
    .pipe(server.stream());
}

export default sass;
