const img = () => {
	return $.gulp.src($.path.img.src)
	.pipe($.plugin.newer($.path.img.dist))
	.pipe($.plugin.imagemin($.setting.imagemin))
	.pipe($.gulp.dest($.path.img.dist))
	.pipe($.browserSync.stream());
}

module.exports = img;
