const fonts = () => {
	return $.gulp.src($.path.fonts.src)
	.pipe($.plugins.newer($.path.fonts.dist))
	.pipe($.gulp.dest($.path.fonts.dist))
	.pipe($.browserSync.stream());
}

module.exports = fonts;