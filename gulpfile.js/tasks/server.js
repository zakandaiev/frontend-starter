const server = () => {
	$.browserSync.init({
		// proxy: "starter.local",
		server: {
			baseDir: $.path.root
		},
		//tunnel: true,
		notify: false,
		open: true
	});
}

module.exports = server;