import { path } from '#core/path.js';
import gulp from 'gulp';
import newer from 'gulp-newer';

function publicFiles() {
  return gulp.src(path.public.src, { dot: true, encoding: false })
    .pipe(newer(path.public.dist))
    .pipe(gulp.dest(path.public.dist));
}

export default publicFiles;
