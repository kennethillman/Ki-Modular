module.exports = function (gulp, plugins, dirs, browserSync, settings) {
	return function () {
		browserSync({
			server: {
				baseDir: dirs.dev
			},
			port: settings.port,
			// host: '192.168.83.9', // IF YOU'VE GOT MULTIPLE NETWORK CONNECTIONS YOU CAN MANUALLY TYPE IN HOST IP HERE
			ui: {
				port: settings.uiPort,
				weinre: {
					port: settings.weinrePort
				}
			}
		});
	};
};
