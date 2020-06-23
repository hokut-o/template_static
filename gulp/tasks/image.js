import gulp from "gulp";
import del from "del";
import imagemin from "gulp-imagemin";
import imageminPng from "imagemin-pngquant";
import imageminJpg from "imagemin-jpeg-recompress";
import imageminGif from "imagemin-gifsicle";
import paths from "../config";

export const cleanImage = () => {
	return del(`${paths.img_dest}**`);
};

export const copyImage = () => {
	return gulp.src(`${paths.img_src}**/*.*`).pipe(gulp.dest(paths.img_dest));
};

export const buildImage = () => {
	return gulp
		.src(`${paths.img_src}**/*.{jpg,jpeg,png,gif}`)
		.pipe(imagemin([
			imageminPng(),
			imageminJpg(),
			imageminGif()
		]))
		.pipe(gulp.dest(paths.img_build));
};
