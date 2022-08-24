const js = () => {
	return $.gulp.src($.path.js.src, {sourcemaps: $.setting.isDev})
	.pipe($.plugin.fileInclude())
	.pipe(
		$.plugin.if(
			$.setting.isProd,
			$.plugin.babel()
		)
	)
	.pipe(
		$.plugin.if(
			$.setting.isProd,
			$.plugin.terser($.setting.terser)
		)
	)
	.pipe($.gulp.dest($.path.js.dist, {sourcemaps: $.setting.isDev}))
	.pipe($.browserSync.stream());
}

module.exports = js;
