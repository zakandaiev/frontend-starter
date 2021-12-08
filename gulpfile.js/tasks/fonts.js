const fonts = () => {
	return $.gulp.src($.path.fonts.src)
	.pipe($.plugins.newer($.path.fonts.dest))
	.pipe($.gulp.dest($.path.fonts.dest))
	.pipe($.browserSync.stream());
}

module.exports = fonts;