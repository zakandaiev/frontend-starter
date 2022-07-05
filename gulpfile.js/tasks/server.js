const server = () => {
	$.browserSync.init({
		// proxy: "starter.loc",
		// or
		server: {baseDir: $.path.root},
		//tunnel: true,
		notify: false,
		open: true
	});
}

module.exports = server;