const js = () => {
	return $.gulp.src($.path.js.src, {sourcemaps: $.setting.isDev})
	.pipe($.plugin.fileInclude())
	.pipe($.plugin.babel())
	.pipe($.plugin.uglify())
	.pipe($.gulp.dest($.path.js.dist, {sourcemaps: $.setting.isDev}))
	.pipe($.browserSync.stream());
}

module.exports = js;
