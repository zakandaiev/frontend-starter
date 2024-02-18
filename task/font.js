import gulp from 'gulp';
import newer from 'gulp-newer';
import browserSync from 'browser-sync';
import { path } from '../config.js';

function font() {
  return gulp.src(path.font.src)
    .pipe(newer(path.font.dist))
    .pipe(gulp.dest(path.font.dist))
    .pipe(browserSync.stream());
}

export default font;
