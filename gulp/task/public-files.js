import gulp from 'gulp';
import newer from 'gulp-newer';
import { path } from '../config/path.js';

function publicFiles() {
  return gulp.src(path.public.src, { dot: true, encoding: false })
    .pipe(newer(path.public.dist))
    .pipe(gulp.dest(path.public.dist));
}

export default publicFiles;
