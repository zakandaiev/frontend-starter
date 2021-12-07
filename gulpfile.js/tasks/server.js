const server = () => {
	$.browserSync.init({
		server: {
			baseDir: $.path.root
		},
		//tunnel: true,
		notify: false,
		open: true
	});
}

module.exports = server;