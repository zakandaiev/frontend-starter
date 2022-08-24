const server = () => {
	$.browserSync.init({
		// proxy: 'starter.loc',
		// or
		server: {baseDir: $.path.dist},
		//tunnel: true,
		port: 3000,
		notify: false,
		open: true
	});
}

module.exports = server;
