import gulp from 'gulp'
import pug from 'gulp-pug'
import plumber from 'gulp-plumber'
import vinylYamlData from 'vinyl-yaml-data'
import deepExtend from 'deep-extend-stream'
import pugInheritance from 'gulp-pug-inheritance'
import cached from 'gulp-cached'
import changed from 'gulp-changed'
import filter from 'gulp-filter'
import gulpif from 'gulp-if'
import browserSync from "browser-sync";
import paths from '../config'

let locals = {};

gulp.task('yaml', () => {
	locals = {};
	return gulp.src(paths.yaml_src)
	.pipe(plumber())
	.pipe(vinylYamlData())
	.pipe(deepExtend(locals))
});

gulp.task('pugAll', ['yaml'], () => {
	return gulp.src([paths.pug_src, paths.pug_exclude])
	.pipe(plumber())
	.pipe(pug({
		pretty: true,
		locals: locals
	}))
	.on('error', (err) => {
		console.log(err.message);
	})
	.pipe(gulp.dest(paths.dest))
});

gulp.task('pug', ['yaml'], () => {
	return gulp.src(paths.pug_src)
	.pipe(plumber())
	.pipe(changed('dest', {extension: '.html'}))
	.pipe(gulpif(global.isWatching, cached('pug')))
	.pipe(pugInheritance({
		basedir: 'src/pug',
		skip: 'node_modules'
	}))
	.pipe(filter(function(file) {
		return !/\/_/.test(file.path) && !/^_/.test(file.relative);
	}))
	.pipe(pug({
		pretty: true,
		locals: locals
	}))
	.on('error', (err) => {
		console.log(err.message);
	})
	.pipe(gulp.dest('dest'))
	.pipe(browserSync.stream());
});

gulp.task('setWatch', () => {
	global.isWatching = true;
});