var del = require('del');

module.exports = function (gulp, plugins, dirs) {
	return function(cb) {
		del([dirs.dev, dirs.dist], cb);
	};
};
