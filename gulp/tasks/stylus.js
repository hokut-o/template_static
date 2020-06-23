import gulp from "gulp";
import stylus from "gulp-stylus";
import autoprefixer from "autoprefixer";
import plumber from "gulp-plumber";
import browserSync from "browser-sync";
import postcss from "gulp-postcss";
import mqpacker from "css-mqpacker";
import sortCSSmq from "sort-css-media-queries";
import rupture from "rupture";
import convertEncoding from 'gulp-convert-encoding';
import header from 'gulp-header';
import paths from "../config";

export const compileStylus = () => {
	return gulp
		.src(`${paths.stylus_src}`, { sourcemaps: true })
		.pipe(plumber())
		.pipe(
			stylus({
				"include css": true,
				compress: false,
				use: [rupture()]
			})
		)
		.pipe(
			postcss([
				mqpacker({
					sort: sortCSSmq
				}),
				autoprefixer({
					remove: false,
					grid: true
				})
			])
		)
		.on("error", err => {
			console.log(err.message);
		})
		.pipe(gulp.dest(`${paths.stylus_dest}`, { sourcemaps: true }))
		.pipe(browserSync.stream());
};

export const buildStylus = () => {
	return gulp
		.src(`${paths.stylus_src}`)
		.pipe(plumber())
		.pipe(
			stylus({
				"include css": true,
				compress: true,
				use: [rupture()]
			})
		)
		.pipe(
			postcss([
				mqpacker({
					sort: sortCSSmq
				}),
				autoprefixer({
					remove: false,
					grid: true
				})
			])
		)
		.on("error", err => {
			console.log(err.message);
		})
		.pipe(convertEncoding({to: "shift_jis"}))
		.pipe(header('@charset "shift_jis";\n'))
		.pipe(gulp.dest(`${paths.stylus_build}`));
};
