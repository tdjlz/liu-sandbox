var gulp 		= require('gulp'),
	sass 		= require('gulp-sass'),
	json		= require('json-file'),
	plumber 	= require('gulp-plumber'),
	livereload 	= require('gulp-livereload'),
	sourcemaps 	= require('gulp-sourcemaps'),
	notify 		= require('gulp-notify'),
	browserSync = require('browser-sync'),
	themeName	= json.read('./package.json').get('themeName'),
	stylish 	= require('jshint-stylish'),
	rename 		= require('gulp-rename'),
	themeDir	= '../' + themeName;

var plumberErrorHandler = { errorHandler: notify.onError({
		title: 'Gulp',
		message: 'Error: <%= error.message %>'
	})
};

gulp.task('browserSync', function() {
	browserSync({
		proxy: "localhost/liu-sandbox/liu-sandbox"
	})
})

gulp.task('init', function() {
	fs.mkdirSync(themeDir, 765, true);
	fse.copySync('theme_boilerplate', themeDir + '/');
});

gulp.task('sass', function() {
	gulp.src('./css/src/**/*.scss')
		.pipe(plumber(plumberErrorHandler))
		.pipe(sass())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./css'))
	    .pipe(browserSync.reload({ // Reloading with Browser Sync
	      stream: true
	    }));
});

gulp.task('watch', function() {
	gulp.watch('css/src/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'browserSync', 'watch']);