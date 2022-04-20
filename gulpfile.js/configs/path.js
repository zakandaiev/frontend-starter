const pathSrc = "./src";
const pathDist = "./dist";

module.exports = {
	root: pathDist,

	clear: pathDist,

	html: {
		src: pathSrc + "/html/*.html",
		watch: pathSrc + "/html/**/*.html",
		dist: pathDist
	},

	sass: {
		src: pathSrc + "/sass/*.{sass,scss}",
		watch: pathSrc + "/sass/**/*.{sass,scss}",
		dist: pathDist + "/css"
	},

	js: {
		src: pathSrc + "/js/*.js",
		watch: pathSrc + "/js/**/*.js",
		dist: pathDist + "/js"
	},

	img: {
		src: pathSrc + "/img/**/*.*",
		watch: pathSrc + "/img/**/*.*",
		dist: pathDist + "/img"
	},

	fonts: {
		src: pathSrc + "/fonts/*.{woff2,ttf}",
		watch: pathSrc + "/fonts/*.{woff2,ttf}",
		dist: pathDist + "/fonts"
	},

	rootFiles: {
		src: pathSrc + "/root-files/**/*.*",
		watch: pathSrc + "/root-files/**/*.*",
		dist: pathDist
	}
};