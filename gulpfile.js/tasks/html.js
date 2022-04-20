const html = () => {
	return $.gulp.src($.path.html.src)
	.pipe($.plugins.fileInclude())
	.pipe($.plugins.htmlmin($.settings.htmlmin))
	.pipe($.gulp.dest($.path.html.dist))
	.pipe($.browserSync.stream());
}

module.exports = html;