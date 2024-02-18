import gulp from 'gulp';
import newer from 'gulp-newer';
import gulpif from 'gulp-if';
import imagemin, {
  gifsicle, mozjpeg, optipng, svgo,
} from 'gulp-imagemin';
import browserSync from 'browser-sync';
import { isProd, path, plugin } from '../config.js';

function img() {
  return gulp.src(path.img.src)
    .pipe(newer(path.img.dist))
    .pipe(
      gulpif(
        isProd,
        imagemin([
          gifsicle(plugin.imagemin.gifsicle),
          mozjpeg(plugin.imagemin.mozjpeg),
          optipng(plugin.imagemin.optipng),
          svgo(plugin.imagemin.svgo),
        ]),
      ),
    )
    .pipe(gulp.dest(path.img.dist))
    .pipe(browserSync.stream());
}

export default img;
