import { path } from '#core/path.js';
import gulp from 'gulp';
import newer from 'gulp-newer';

function font() {
  return gulp.src(path.font.src, { encoding: false })
    .pipe(newer(path.font.dist))
    .pipe(gulp.dest(path.font.dist));
}

export default font;
