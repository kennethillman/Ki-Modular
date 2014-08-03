module.exports = function (grunt) {
	// load all grunt tasks matching the `grunt-*` pattern
	require('load-grunt-tasks')(grunt);
	
	// directories used in grunt task options
	var dirs = {
		src: 'ui-dev',
		docs: 'ui--docs',
		srcMypages: 'ui-myPages',
		srcCore: 'ui-core',
		dev: 'ui-dev-view',
		dist: 'ui-dist',
		vendor: 'ui-vendor',
		process: '.process',
		//
		styles: 'ui-core',
		stylesOutput: 'styles',
		scripts: 'scripts',
		images: 'images',
		partials: 'partials'
	}

	// port to run connect server on and livereload
	var port = 4000;
	var lrPort = port + 30000;

	// should compass be used for pre-processing
	var useCompass = false;

	// folder where grunt task and option files are found
	var gruntFolder = './grunt';

	// Load config options.
	var requireDirectory = require('require-directory');
	var options = requireDirectory(module, gruntFolder + '/options');

	// Resolve options expressed as functions.
	Object.keys(options).forEach(function (name) {
		if (typeof options[name] === 'function') {
			options[name] = options[name](grunt);
		}
	});

	// init config object
	var config = {
		pkg: grunt.file.readJSON('package.json'),
		dirs: dirs,
		port: port,
		lrPort: lrPort,
		useCompass: useCompass
	};

	// extend our current config with grunt task options
	config = grunt.util._.extend(config, options);

	grunt.initConfig(config);
	grunt.loadTasks(gruntFolder + '/tasks');
};