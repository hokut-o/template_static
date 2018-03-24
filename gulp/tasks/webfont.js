import gulp from 'gulp';
import fontmin from 'gulp-fontmin';
import fs from 'fs';
import paths from '../config';

gulp.task('webfont', () => {
	return gulp.src(paths.webfont_src)
	.pipe(fontmin({
		text: getHtmlText()
	}))
	.pipe(gulp.dest(paths.font_dest));
});

function getHtmlText() {
	const ascii = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
	const data = fs.readFileSync('./dest/index.html', {
		encoding: 'utf-8'
	});
	const all = ascii + data.toString().split('\n').join('');
	console.log(all);
	return all;
}