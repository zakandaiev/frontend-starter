import gulp from 'gulp';
import newer from 'gulp-newer';
import { path } from './path.js';

function font() {
  return gulp.src(path.font.src, { encoding: false })
    .pipe(newer(path.font.dist))
    .pipe(gulp.dest(path.font.dist));
}

export default font;
