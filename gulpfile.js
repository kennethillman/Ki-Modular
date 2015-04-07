///////////////////////////
// Config
///////////////////////////

// Directories
var dirs = {
	src: 'src',
	dev: 'dev',
	dist: 'dist',
	scripts: 'scripts',
	styles: 'styles',
	fonts: 'fonts',
	images: 'images'
};

// Settings
var settings = {
	port: 8000,
	uiPort: 8001,
	weinrePort: 8080
};

// Sftp options
var sftpOptions = {
	host: 'clients.ottoboni.se',
	remotePath: '/OttoboniClients/gulp-sftp/',
	auth: 'key'
}


///////////////////////////
// Plugins
///////////////////////////

// Gulp
var gulp = require('gulp');

// Gulp plugins
var plugins = require('gulp-load-plugins')();

// Other node modules
var path = require('path');
var browserSync = require('browser-sync');

// Define task directory
var requireDir = require('require-dir');
var dir = requireDir('./tasks');


///////////////////////////
// Functions
///////////////////////////

// Get task function
function getTask(task) {
	var args = Array.prototype.slice.call(arguments, 1);
	args.unshift(gulp, plugins, dirs);

    return require('./tasks/' + task).apply(null, args);
}

// Create task function
function createTask(taskName, dependencies /*, taskArgs... */) {
	if (!dependencies) {
		// Create gulp task
		gulp.task(taskName, getTask(taskName));
	} else if (dependencies instanceof Array) {
		// Break out task arguments
		var taskArgs = Array.prototype.slice.call(arguments, 2);

		// Add task name to beginning of array
		taskArgs.unshift(taskName);

		// Create gulp task
		gulp.task(taskName, dependencies, getTask.apply(null, taskArgs));
	} else {
		// Break out task arguments
		var taskArgs = Array.prototype.slice.call(arguments, 0);

		// Create gulp task
		gulp.task(taskName, getTask.apply(null, taskArgs));
	}
}


///////////////////////////
// Tasks
///////////////////////////

gulp.task('default', ['browser-sync', 'watch']);

gulp.task('build', ['images', 'fonts', 'svg', 'scripts', 'styles', 'html']);

createTask('deploy', ['build'], sftpOptions); // CURRENTLY ONLY WORKING FOR CONNECTIONS IN ACTIVE MODE

createTask('clean');

createTask('scripts');

createTask('styles', ['images', 'svg'], browserSync);

createTask('html');

createTask('fonts');

createTask('images');

createTask('svg');

createTask('browser-sync', ['build'], browserSync, settings);

gulp.task('watch', function() {
	gulp.watch(path.join(dirs.src, dirs.styles, '**', '*.scss'), ['styles']);
	gulp.watch(path.join(dirs.src, dirs.scripts, '**', '*.js'), ['scripts', browserSync.reload]);
	gulp.watch(path.join(dirs.src, '**', '*.html'), ['html', browserSync.reload]);
	gulp.watch(path.join(dirs.src, dirs.images, '**', '*.{png,jpg,jpeg,gif,svg}'), ['images', browserSync.reload]);
	gulp.watch(path.join(dirs.src, dirs.images, '**', '*.svg'), ['svg', browserSync.reload]);
	gulp.watch(path.join(dirs.src, dirs.fonts, '**', '*.{eot,otf,woff,svg,ttf}'), ['fonts', browserSync.reload]);
});
