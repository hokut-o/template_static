import gulp from 'gulp';
import spritesmith from 'gulp.spritesmith';
import buffer from 'vinyl-buffer';
import merge from 'merge-stream';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import svgSprite from 'gulp-svg-sprite'
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import inject from 'gulp-inject';
import html2jade from 'gulp-html2jade'
import rename from 'gulp-rename';
import paths from '../config';

// png
gulp.task('spritePng', () => {
	const spriteData = gulp.src(`${paths.sprite_src}png/*.png`)
	.pipe(spritesmith({
		imgName: '../img/sprite.png',
		cssName: 'sprite.styl',
		padding: 5
	}));

	const imgStream = spriteData.img
	.pipe(buffer())
	.pipe(imagemin(
		[pngquant()]
	))
	.pipe(imagemin())
	.pipe(gulp.dest(`${paths.sprite_dest}`));

	const cssStream = spriteData.css
	.pipe(gulp.dest(`${paths.stylus_component_dest}`));
	return merge(imgStream, cssStream);
});


//svg
gulp.task('spriteSvg', () => {
	return gulp.src(`${paths.sprite_src}svg/*.svg`)
	.pipe(svgSprite({
		mode: {
			symbol: {
				// スプライト画像を置くディレクトリ名
				dest: './',
				// スプライト画像のファイル名
				sprite: 'sprite.svg',
				// スプライト画像のプレビュー用HTML
				example: {
					dest: '../../dest/template/svg/sprite.html',
				}
			},
		},
		// mode
		shape: {
			transform: [
				{
					svgo: {
						plugins: [
							{collapseGroups: false},
							{
								cleanupIDs: {
									remove: false,
								}
							},
							{
								prefixIds: {
									prefix: "test"
								}
							},
							{removeUnknownsAndDefaults: false},
							{removeViewBox: false},
						]
					}
				}
			]
		}
	}))
	// 書き出し先
	.pipe(gulp.dest(`${paths.img_src}`));
});

// svg inline
gulp.task('svgSprteInline', () => {
	const svgs = gulp
	.src(`${paths.sprite_src}svg-inline/*.svg`)
	.pipe(svgmin())
	.pipe(svgstore({inlineSvg: true}));

	function fileContents(filePath, file) {
		return file.contents.toString();
	}

	return gulp
	.src(`${paths.template_src}svgsprite-inline/svgsprite-inline.html`)
	.pipe(inject(svgs, {transform: fileContents}))
	.pipe(html2jade())
	.pipe(rename({
		extname: '.pug'
	}))
	.pipe(gulp.dest(`${paths.template_dest}svgsprite-inline/`));
});