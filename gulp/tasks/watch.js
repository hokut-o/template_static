import gulp from "gulp";
import paths from "../config";
import { compilePug, yaml } from "./pug";
import { compileStylus } from "./stylus";
import { compileJs } from "./webpack";
import { reload } from "./server";

export const watch = done => {
	gulp.watch(
		[`${paths.pug_src}`, `${paths.yaml_src}`],
		gulp.series(yaml, compilePug, reload)
	)
	gulp.watch(
		`${paths.stylus_src}`,
		gulp.series(compileStylus, reload)
	)
	gulp.watch(
		`${paths.js_src}`,
		gulp.series(compileJs, reload)
	)
	done();
};
