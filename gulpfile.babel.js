import gulp from "gulp";
import { watch } from "./gulp/tasks/watch";
import { buildStylus, compileStylus } from "./gulp/tasks/stylus";
import { buildPug, compilePug, yaml } from "./gulp/tasks/pug";
import { server } from "./gulp/tasks/server";
import { buildJs, compileJs } from "./gulp/tasks/webpack";
import { buildImage, cleanImage, copyImage } from "./gulp/tasks/image";
import { createIconfont } from "./gulp/tasks/iconfont";
import { copyFont, copySvg } from "./gulp/tasks/copy";
import {
	createSpritePng,
	createSpriteSvg,
	createSpriteSvgInline
} from "./gulp/tasks/sprite";

exports.default = gulp.series(
	yaml,
	cleanImage,
	gulp.parallel(compileStylus, compileJs, compilePug, copyImage),
	watch,
	server
);

exports.build = gulp.series(
	yaml,
	cleanImage,
	copyImage,
	gulp.parallel(buildStylus, buildPug, buildJs, buildImage, copySvg, copyFont),
);

exports.iconfont = createIconfont;
exports.spritePng = createSpritePng;
exports.spriteSvg = createSpriteSvg;
exports.spriteSvgInline = createSpriteSvgInline;
