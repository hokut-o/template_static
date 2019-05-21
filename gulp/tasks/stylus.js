import gulp from 'gulp';
import stylus from 'gulp-stylus';
import autoprefixer from 'autoprefixer';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import mqpacker from 'css-mqpacker';
import sortCSSmq from 'sort-css-media-queries';
import rupture from 'rupture'
import paths from '../config';

gulp.task('stylus', () => {
	return gulp.src(`${paths.stylus_src}app.styl`)
	.pipe(sourcemaps.init())
	.pipe(plumber())
	.pipe(stylus({
			'include css': true,
			compress: false,
			use: [rupture()]
		}
	))
	.pipe(postcss([
		mqpacker({
			sort: sortCSSmq
		}),
		autoprefixer({
			remove: false,
			grid: true
		})
	]))
	.on('error', function(err) {
		console.log(err.message);
	})
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(`${paths.stylus_dest}`))
	.pipe(browserSync.stream());
});