import { processArg } from '#core/app.js';
import { path } from '#core/path.js';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import imagemin, {
  gifsicle,
  mozjpeg,
  optipng,
  svgo,
} from 'gulp-imagemin';
import newer from 'gulp-newer';

function img() {
  return gulp.src(path.img.src, { encoding: false })
    .pipe(newer(path.img.dist))
    .pipe(
      gulpif(
        processArg.isBuild,
        imagemin([
          gifsicle({
            optimizationLevel: 1,
            interlaced: false,
          }),
          mozjpeg({
            quality: 75, progressive: true,
          }),
          optipng({
            optimizationLevel: 5,
          }),
          svgo({
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
          }),
        ]),
      ),
    )
    .pipe(gulp.dest(path.img.dist));
}

export default img;
