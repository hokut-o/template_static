import gulp        from 'gulp';
import spritesmith from 'gulp.spritesmith';
import buffer      from 'vinyl-buffer';
import merge       from 'merge-stream';
import imagemin    from 'gulp-imagemin';
import pngquant    from 'imagemin-pngquant';
import svgmin      from 'gulp-svgmin';
import svgstore    from 'gulp-svgstore';
import rename      from 'gulp-rename';
import cheerio     from 'gulp-cheerio';
import paths       from '../config';

// png
gulp.task('spritePng', () => {
	const spriteData = gulp.src(paths.img_sprite_src + '*.png')
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
		.pipe(gulp.dest(paths.img_sprite_dest));

	const cssStream = spriteData.css
		.pipe(gulp.dest('./src/stylus/object/component/'));

	return merge(imgStream, cssStream);
});

// svg
gulp.task('spriteSvg', () => {
	gulp.src(paths.img_sprite_src + '*.svg')
		.pipe(svgmin())
		.pipe(svgstore({
			inlineSvg: true
		}))
		.pipe(cheerio({
			run: function($, file) {
				$('svg').attr('style',  'display:none');
			},
			parserOptions: {xmlMode: true}
		}))
		.pipe(rename('sprite.svg'))
		.pipe(gulp.dest('./src/img/'));
});