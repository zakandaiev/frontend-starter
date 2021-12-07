const rootFiles = () => {
	return $.gulp.src($.path.rootFiles.src)
	.pipe($.plugins.newer($.path.rootFiles.dest))
	.pipe($.gulp.dest($.path.rootFiles.dest))
	.pipe($.browserSync.stream());
}

module.exports = rootFiles;