import gulp from 'gulp';
import newer from 'gulp-newer';
import gulpif from 'gulp-if';
import imagemin, {
  gifsicle, mozjpeg, optipng, svgo,
} from 'gulp-imagemin';
import { isProd } from '../config/app.js';
import { path } from '../config/path.js';
import { imagemin as imageminConfig } from '../config/plugin.js';

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
