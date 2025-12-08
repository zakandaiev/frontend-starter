import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import postCss from 'gulp-postcss';
import gulpSass from 'gulp-sass';
import combineMediaQuery from 'postcss-combine-media-query';
import dartSass from 'sass';
import { isDev, isProd } from './app.js';
import { path } from './path.js';
import server from './server.js';

const sassPlugin = gulpSass(dartSass);

const sassConfig = {
  api: 'modern-compiler',
  loadPaths: ['node_modules'],
  silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import'],
};

const autoprefixerConfig = {
  cascade: !isProd,
  grid: false,
};

const cssnanoConfig = {
  preset: [
    'default',
    {
      discardComments: {
        removeAll: true,
      },
    },
  ],
};

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
