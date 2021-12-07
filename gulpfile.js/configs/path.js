const pathSrc = "./src";
const pathDest = "./dest";

module.exports = {
	root: pathDest,

	clear: pathDest,

	html: {
		src: pathSrc + "/html/*.html",
		watch: pathSrc + "/html/**/*.html",
		dest: pathDest
	},

	sass: {
		src: pathSrc + "/sass/*.{sass,scss}",
		watch: pathSrc + "/sass/**/*.{sass,scss}",
		dest: pathDest + "/css"
	},

	js: {
		src: pathSrc + "/js/*.js",
		watch: pathSrc + "/js/**/*.js",
		dest: pathDest + "/js"
	},

	img: {
		src: pathSrc + "/img/**/*.*",
		watch: pathSrc + "/img/**/*.*",
		dest: pathDest + "/img"
	},

	fonts: {
		src: pathSrc + "/fonts/*.ttf",
		watch: pathSrc + "/fonts/*.ttf",
		dest: pathDest + "/fonts"
	},

	rootFiles: {
		src: pathSrc + "/root-files/**/*.*",
		watch: pathSrc + "/root-files/**/*.*",
		dest: pathDest
	}
};