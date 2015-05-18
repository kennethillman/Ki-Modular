var path = require('path');

module.exports = function (gulp, plugins, dirs) {
	return function () {
		return gulp.src(path.join(dirs.src, '*.html'))
			.pipe(plugins.plumber())
			.pipe(plugins.using())
			//.pipe(plugins.changed(dirs.dev))
			.pipe(plugins.fileInclude())
			.pipe(gulp.dest(dirs.dev));
	};
};
