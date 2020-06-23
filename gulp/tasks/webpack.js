import gulp from "gulp";
import webpackStream from "webpack-stream";
import webpack from "webpack";
import webpackConfig from "../../webpack.config";
import webpackConfigBuild from "../../webpack.config.build";
import plumber from "gulp-plumber";
import convertEncoding from 'gulp-convert-encoding';
import paths from "../config";

export const compileJs = () => {
	return gulp
		.src(`${paths.js_src}`)
		.pipe(plumber())
		.pipe(webpackStream(webpackConfig, webpack))
		.pipe(gulp.dest(`${paths.js_dest}`));
}

export const buildJs = () => {
	return gulp
		.src(`${paths.js_src}`)
		.pipe(plumber())
		.pipe(webpackStream(webpackConfigBuild, webpack))
		.pipe(convertEncoding({to: "shift_jis"}))
		.pipe(gulp.dest(`${paths.js_build}`));
}