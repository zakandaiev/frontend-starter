'use strict';

global.$ = {
	// Main
	gulp: require('gulp'),
	plugin: require('gulp-load-plugins')(),
	browserSync: require('browser-sync').create(),
	// Configs
	path: require('./config/path.js'),
	setting: require('./config/setting.js')
}

// TASKS
const clear = require('./task/clear.js');
const server = require('./task/server.js');

const html = require('./task/html.js');
const sass = require('./task/sass.js');
const js = require('./task/js.js');
const img = require('./task/img.js');
const font = require('./task/font.js');
const rootFiles = require('./task/rootFiles.js');

// WATCHER
const watch = () => {
	$.gulp.watch($.path.html.watch, html).on('change', $.browserSync.reload);
	$.gulp.watch($.path.sass.watch, sass);
	$.gulp.watch($.path.js.watch, js).on('change', $.browserSync.reload);
	$.gulp.watch($.path.img.watch, img).on('change', $.browserSync.reload);
	$.gulp.watch($.path.font.watch, font).on('change', $.browserSync.reload);
	$.gulp.watch($.path.rootFiles.watch, rootFiles).on('change', $.browserSync.reload);
}

// BUILD
const build = $.gulp.series(
	clear,
	$.gulp.parallel(html, sass, js, img, font, rootFiles)
);
const dev = $.gulp.series(
	build,
	$.gulp.parallel(watch, server)
);

// EXPORT TASKS
exports.clear = clear;
exports.html = html;
exports.sass = sass;
exports.js = js;
exports.img = img;
exports.font = font;
exports.rootFiles = rootFiles;

exports.dev = dev;
exports.prod = build;
exports.default = $.setting.isProd ? build : dev;
