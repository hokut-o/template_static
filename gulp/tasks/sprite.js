import gulp from "gulp";
import spritesmith from "gulp.spritesmith";
import buffer from "vinyl-buffer";
import merge from "merge-stream";
import imagemin from "gulp-imagemin";
import pngquant from "imagemin-pngquant";
import svgSprite from "gulp-svg-sprite";
import svgmin from "gulp-svgmin";
import svgstore from "gulp-svgstore";
import inject from "gulp-inject";
import html2jade from "gulp-html2jade";
import rename from "gulp-rename";
import paths from "../config";

// png
export const createSpritePng = () => {
	const spriteData = gulp.src(`${paths.sprite_src}png/*.png`).pipe(
		spritesmith({
			imgName: "../img/sprite.png",
			cssName: "sprite.styl",
			padding: 5
		})
	);

	const imgStream = spriteData.img
		.pipe(buffer())
		.pipe(imagemin([pngquant()]))
		.pipe(imagemin())
		.pipe(gulp.dest(`${paths.sprite_dest}`));

	const cssStream = spriteData.css.pipe(
		gulp.dest(`${paths.stylus_component_dest}`)
	);
	return merge(imgStream, cssStream);
};

//svg
export const createSpriteSvg = () => {
	return gulp
		.src(`${paths.sprite_src}svg/*.svg`)
		.pipe(
			svgSprite({
				mode: {
					// SVGファイルをsymbol要素としてまとめる。
					symbol: {
						dest: "./",
						// 出力するファイル名。
						sprite: "sprite.svg"
					}
				},
				shape: {
					transform: [
						{
							svgo: {
								plugins: [
									// `style`属性を削除する。
									{ removeStyleElement: true },
									// viewBox属性を削除する（widthとheight属性がある場合）。
									// 表示が崩れる原因になるので削除しない。
									{ removeViewBox: false },
									// <metadata>を削除する。
									// 追加したmetadataを削除する必要はない。
									{ removeMetadata: false },
									// SVGの仕様に含まれていないタグや属性、id属性やversion属性を削除する。
									// 追加した要素を削除する必要はない。
									{ removeUnknownsAndDefaults: false },
									// コードが短くなる場合だけ<path>に変換する。
									// アニメーションが動作しない可能性があるので変換しない。
									{ convertShapeToPath: false },
									// 重複や不要な`<g>`タグを削除する。
									// アニメーションが動作しない可能性があるので変換しない。
									{ collapseGroups: false },
									// SVG内に<style>や<script>がなければidを削除する。
									// idにアンカーが貼られていたら削除せずにid名を縮小する。
									// id属性は動作の起点となることがあるため削除しない。
									{ cleanupIDs: false }
								]
							}
						}
					]
				},
				svg: {
					// xml宣言を出力する。
					xmlDeclaration: true,
					// DOCTYPE宣言を出力する。
					doctypeDeclaration: false,
					//IDに名前属性を追加する。
					//IDは手動で設定済みなので追加しない。
					namespaceIDs: false
				}
			})
		)
		.pipe(gulp.dest(`${paths.img_src}`));
};

export const createSpriteSvgInline = () => {
	const svgs = gulp
		.src(`${paths.sprite_src}svg-inline/*.svg`)
		.pipe(svgmin())
		.pipe(svgstore({ inlineSvg: true }));

	function fileContents(filePath, file) {
		return file.contents.toString();
	}

	return gulp
		.src(`${paths.template_src}svgsprite-inline/svgsprite-inline.html`)
		.pipe(inject(svgs, { transform: fileContents }))
		.pipe(html2jade())
		.pipe(
			rename({
				extname: ".pug"
			})
		)
		.pipe(gulp.dest(`${paths.template_dest}svgsprite-inline/`));
};
