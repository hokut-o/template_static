import gulp from 'gulp'
import webpackStream from 'webpack-stream'
import webpack from 'webpack'
import webpackConfig from '../../webpack.config'
import browserSync from 'browser-sync'
import plumber from 'gulp-plumber'
import paths from '../config'

gulp.task("webpack", () => {
	return gulp.src(paths.js_src)
	.pipe(plumber())
	.pipe(webpackStream(webpackConfig, webpack))
	.pipe(gulp.dest(paths.js_dest))
	.pipe(browserSync.stream());
});