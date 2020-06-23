import gulp from "gulp";
import pug from "gulp-pug";
import plumber from "gulp-plumber";
import vinylYamlData from "vinyl-yaml-data";
import deepExtend from "deep-extend-stream";
import paths from "../config";

let locals = {};

export const yaml = () => {
	locals = {};
	return gulp
		.src(paths.yaml_src)
		.pipe(plumber())
		.pipe(vinylYamlData())
		.pipe(deepExtend(locals));
}

export const compilePug = () => {
	return gulp
		.src([`${paths.pug_src}`, `!${paths.pug_include}`])
		.pipe(plumber())
		.pipe(
			pug({
				pretty: true,
				locals: locals
			})
		)
		.on("error", err => {
			console.log(err.message);
		})
		.pipe(gulp.dest(paths.dest));
}

export const buildPug = () => {
	return gulp
		.src([`${paths.pug_src}`, `!${paths.pug_include}`])
		.pipe(plumber())
		.pipe(
			pug({
				pretty: true,
				locals: locals
			})
		)
		.on("error", err => {
			console.log(err.message);
		})
		.pipe(gulp.dest(paths.build));
}