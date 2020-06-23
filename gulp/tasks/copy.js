import gulp from "gulp";
import paths from "../config";

export const copySvg = () => {
	return gulp
		.src(`${paths.img_src}**/*.svg`)
		.pipe(gulp.dest(paths.img_build));
};

export const copyFont = () => {
	return gulp
		.src(`${paths.dest}font/*.*`)
		.pipe(gulp.dest(`build/font/`));
};
