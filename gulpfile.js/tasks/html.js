const html = () => {
	return $.gulp.src($.path.html.src)
	.pipe($.plugins.fileInclude())
	.pipe($.plugins.webpHtml())
	.pipe($.plugins.htmlmin($.settings.htmlmin))
	.pipe($.gulp.dest($.path.html.dest))
	.pipe($.browserSync.stream());
}

module.exports = html;