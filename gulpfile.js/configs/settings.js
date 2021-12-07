const isProd = process.argv.includes("--prod");
const isDev = !isProd;

module.exports = {
	isProd: isProd,
	isDev: isDev,

	htmlmin: {
		collapseWhitespace: isProd,
		minifyCSS: isProd,
		minifyJS: isProd,
		removeComments: isProd
	},

	sass: {
		includePaths: ["node_modules"]
	},

	cleanCss: {
		level: isProd ? 1 : 0,
		format: isProd ? false : "beautify"
	},

	imagemin: {
		interlaced: isProd,
		progressive: isProd,
		optimizationLevel: 5
	}
};