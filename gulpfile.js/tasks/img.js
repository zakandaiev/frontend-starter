const img = () => {
	return $.gulp.src($.path.img.src)
	.pipe($.plugins.newer($.path.img.dest))
	.pipe($.plugins.imagemin($.settings.imagemin))
	.pipe($.gulp.dest($.path.img.dest))
	.pipe($.browserSync.stream());
}

module.exports = img;