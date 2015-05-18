var path = require('path');

module.exports = function (gulp, plugins, dirs, browserSync) {
	return function () {
		return gulp.src(path.join(dirs.core, '*.scss'))
			.pipe(plugins.plumber())
			.pipe(plugins.using())
			//.pipe(plugins.changed(path.join(dirs.dev, dirs.styles)))
			.pipe(plugins.sass())
		
			//.pipe(plugins.autoprefixer())
			//.pipe(plugins.base64({
			//	debug: true
			//}))
			.pipe(gulp.dest(path.join(dirs.dev, dirs.styles)))
			//minify here
			// .pipe(gulp.dest(path.join(dirs.dist, dirs.styles)))
			.pipe(browserSync.reload({stream: true}));
	};
};
