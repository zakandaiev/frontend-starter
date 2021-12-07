"use strict";

global.$ = {
	// Main
	gulp: require("gulp"),
	plugins: require("gulp-load-plugins")(),
	browserSync: require("browser-sync").create(),
	// Configs
	path: require("./configs/path.js"),
	settings: require("./configs/settings.js")
}

// Tasks
const clear = require("./tasks/clear.js");
const server = require("./tasks/server.js");

const html = require("./tasks/html.js");
const sass = require("./tasks/sass.js");
const js = require("./tasks/js.js");
const img = require("./tasks/img.js");
const fonts = require("./tasks/fonts.js");
const rootFiles = require("./tasks/rootFiles.js");

// Watcher
const watch = () => {
	$.gulp.watch($.path.html.watch, html);
	$.gulp.watch($.path.sass.watch, sass);
	$.gulp.watch($.path.js.watch, js);
	$.gulp.watch($.path.img.watch, img);
	$.gulp.watch($.path.fonts.watch, fonts);
	$.gulp.watch($.path.rootFiles.watch, rootFiles);
}

// Build
const build = $.gulp.series(
	clear,
	$.gulp.parallel(html, sass, js, img, fonts, rootFiles)
);
const dev = $.gulp.series(
	build,
	$.gulp.parallel(watch, server)
);

// Export tasks
exports.clear = clear;
exports.html = html;
exports.sass = sass;
exports.js = js;
exports.img = img;
exports.fonts = fonts;
exports.rootFiles = rootFiles;

exports.dev = dev;
exports.prod = build;
exports.default = $.settings.isProd ? build : dev;