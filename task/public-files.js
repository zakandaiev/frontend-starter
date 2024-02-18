import gulp from 'gulp';
import newer from 'gulp-newer';
import browserSync from 'browser-sync';
import { path } from '../config.js';

function publicFiles() {
  return gulp.src(path.public.src, { dot: true })
    .pipe(newer(path.public.dist))
    .pipe(gulp.dest(path.public.dist))
    .pipe(browserSync.stream());
}

export default publicFiles;
