var path = require('path');

module.exports = function (gulp, plugins, dirs) {
	return function () {
		return gulp.src(path.join(dirs.src, dirs.scripts, '**', '*.js'))
			.pipe(plugins.plumber())
			.pipe(plugins.changed(path.join(dirs.dev, dirs.scripts)))
			.pipe(plugins.jshint())
			.pipe(plugins.jshint.reporter('default'))
			.pipe(gulp.dest(path.join(dirs.dev, dirs.scripts)))
			//uglify and concat goes here if needed
			// .pipe(gulp.dest(path.join(dirs.dist, dirs.scripts)));
	};
};
