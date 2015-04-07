var path = require('path');

module.exports = function (gulp, plugins, dirs) {
	return function () {
		gulp.src(path.join(dirs.src, dirs.images, '**', '*.svg'))
				.pipe(plugins.plumber())
				.pipe(plugins.changed(path.join(dirs.dev, dirs.images)))
				.pipe(plugins.raster())
				.pipe(plugins.rename({extname:'.png'}))
				.pipe(plugins.imagemin())
				.pipe(gulp.dest(path.join(dirs.dev, dirs.images)))
				// .pipe(gulp.dest(path.join(dirs.dist, dirs.images)));
	};
};
