const img = () => {
	return $.gulp.src($.path.img.src)
	.pipe($.plugin.newer($.path.img.dist))
	.pipe(
		$.plugin.if(
			$.setting.isProd,
			$.plugin.imagemin([
				$.plugin.imagemin.gifsicle($.setting.imagemin.gifsicle),
				$.plugin.imagemin.mozjpeg($.setting.imagemin.mozjpeg),
				$.plugin.imagemin.optipng($.setting.imagemin.optipng),
				$.plugin.imagemin.svgo($.setting.imagemin.svgo)
			])
		)
	)
	.pipe($.gulp.dest($.path.img.dist))
	.pipe($.browserSync.stream());
}

module.exports = img;
