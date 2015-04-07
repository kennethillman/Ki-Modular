var path = require('path');

module.exports = function (gulp, plugins, dirs) {
	return function () {
		return gulp.src(path.join(dirs.src, dirs.fonts, '**', '*.{eot,otf,woff,svg,ttf}'))
			.pipe(plugins.plumber())
			.pipe(plugins.changed(path.join(dirs.dev, dirs.fonts)))
			.pipe(gulp.dest(path.join(dirs.dev, dirs.fonts)))
	};
};
