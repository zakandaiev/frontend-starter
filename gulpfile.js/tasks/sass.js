const gulpSass = require("gulp-sass")(require("sass"));

const sass = () => {
	return $.gulp.src($.path.sass.src, {sourcemaps: $.setting.isDev})
	.pipe(gulpSass.sync($.setting.sass).on("error", gulpSass.logError))
	.pipe($.plugin.autoprefixer())
	.pipe($.plugin.groupCssMediaQueries())
	.pipe($.plugin.cleanCss($.setting.cleanCss))
	.pipe($.gulp.dest($.path.sass.dist, {sourcemaps: $.setting.isDev}))
	.pipe($.browserSync.stream());
}

module.exports = sass;
