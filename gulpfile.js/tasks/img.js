const img = () => {
	return $.gulp.src($.path.img.src)
	.pipe($.plugins.newer($.path.img.dist))
	.pipe($.plugins.imagemin($.settings.imagemin))
	.pipe($.gulp.dest($.path.img.dist))
	.pipe($.browserSync.stream());
}

module.exports = img;