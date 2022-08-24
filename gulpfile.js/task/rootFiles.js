const rootFiles = () => {
	return $.gulp.src($.path.rootFiles.src, {dot: true})
	.pipe($.plugin.newer($.path.rootFiles.dist))
	.pipe($.gulp.dest($.path.rootFiles.dist))
	.pipe($.browserSync.stream());
}

module.exports = rootFiles;
