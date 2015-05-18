var path = require('path');

module.exports = function (gulp, plugins, dirs) {
	return function () {
		return gulp.src(path.join(dirs.src, '**', '*.{png,jpg,jpeg,gif,svg}'))
			.pipe(plugins.plumber())
			.pipe(plugins.changed(path.join(dirs.dev, dirs.images)))
			.pipe(plugins.imagemin({
				progressive: true,
				svgoPlugins: [ //some plugins break some images
					// {cleanupAttrs: false},
					// {removeDoctype: false},
					// {removeXMLProcInst: false},	
					// {removeComments: false},
					// {removeMetadata: false},
					// {removeTitle: false},
					// {removeEditorsNSData: false},
					// {removeEmptyAttrs: false},
					// {removeHiddenElems: false},
					// {removeEmptyText: false},
					// {removeEmptyContainers: false},
					// {removeViewBox: false},
					// {cleanupEnableBackground: false},
					// {convertStyleToAttrs: false},
					// {convertColors: false},
					// {convertPathData: false},
					// {convertTransform: false},
					// {removeUnknownsAndDefaults: false},
					// {removeNonInheritableGroupAttrs: false},
					// {removeUselessStrokeAndFill: false},
					// {removeUnusedNS: false},
					// {cleanupIDs: false},
					// {cleanupNumericValues: false},
					// {moveElemsAttrsToGroup: false},
					// {moveGroupAttrsToElems: false},
					// {collapseGroups: false},
					// {removeRasterImages: false},
					// {mergePaths: false},
					// {convertShapeToPath: false},
					// {sortAttrs: false},
					// {transformsWithOnePath: false}
				]
			}))
			.pipe(gulp.dest(path.join(dirs.dev)))
			// .pipe(gulp.dest(path.join(dirs.dist, dirs.images)));
	};
};
