import gulp from 'gulp';
import newer from 'gulp-newer';
import gulpif from 'gulp-if';
import imagemin, {
  gifsicle, mozjpeg, optipng, svgo,
} from 'gulp-imagemin';
import { isProd } from './app.js';
import { path } from './path.js';

const imageminConfig = {
  gifsicle: {
    optimizationLevel: 1,
    interlaced: false,
  },
  optipng: {
    optimizationLevel: 5,
  },
  mozjpeg: {
    quality: 75, progressive: true,
  },
  pngquant: {
    quality: [0.7, 0.9],
    speed: 7,
  },
  svgo: {
    plugins: [
      {
        name: 'removeViewBox',
        active: false,
      },
      {
        name: 'convertShapeToPath',
        active: false,
      },
      {
        name: 'convertEllipseToCircle',
        active: false,
      },
    ],
  },
};

function img() {
  return gulp.src(path.img.src, { encoding: false })
    .pipe(newer(path.img.dist))
    .pipe(
      gulpif(
        isProd,
        imagemin([
          gifsicle(imageminConfig.gifsicle),
          mozjpeg(imageminConfig.mozjpeg),
          optipng(imageminConfig.optipng),
          svgo(imageminConfig.svgo),
        ]),
      ),
    )
    .pipe(gulp.dest(path.img.dist));
}

export default img;
