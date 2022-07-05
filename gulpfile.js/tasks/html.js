const html = () => {
	return $.gulp.src($.path.html.src)
	.pipe($.plugin.fileInclude())
	.pipe($.plugin.htmlmin($.setting.htmlmin))
	.pipe($.gulp.dest($.path.html.dist))
	.pipe($.browserSync.stream());
}

module.exports = html;
