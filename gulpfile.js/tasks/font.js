const font = () => {
	return $.gulp.src($.path.font.src)
	.pipe($.plugin.newer($.path.font.dist))
	.pipe($.gulp.dest($.path.font.dist))
	.pipe($.browserSync.stream());
}

module.exports = font;
