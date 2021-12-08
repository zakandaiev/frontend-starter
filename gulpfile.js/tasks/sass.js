const gulpSass = require("gulp-sass")(require("sass"));

const sass = () => {
	return $.gulp.src($.path.sass.src, {sourcemaps: $.settings.isDev})
	.pipe(gulpSass.sync($.settings.sass).on("error", gulpSass.logError))
	.pipe($.plugins.autoprefixer())
	.pipe($.plugins.groupCssMediaQueries())
	.pipe($.plugins.cleanCss($.settings.cleanCss))
	.pipe($.gulp.dest($.path.sass.dest, {sourcemaps: $.settings.isDev}))
	.pipe($.browserSync.stream());
}

module.exports = sass;