var path = require('path');

module.exports = function (gulp, plugins, dirs, sftpOptions) {
	return function () {
		return gulp.src(path.join(dirs.dev, '**'))
			.pipe(plugins.sftp(sftpOptions))
	};
};
