import gulp from 'gulp';
import browserSync from 'browser-sync';
import runSequence from 'run-sequence';
import del from 'del';
import paths from '../config';

gulp.task('reload', () => {
	browserSync.reload();
});

gulp.task('imageClean', () => {
	del(paths.img_dest + '**/*.*');
});

gulp.task('imageCopy', () => {
	return gulp.src('./src/img/**/*.*')
	.pipe(gulp.dest(paths.img_dest));
});

gulp.task('pugDest', (cb) => {
	return runSequence(
		'setWatch',
		'pug',
		cb
	);
});

gulp.task('imageDest', (cb) => {
	return runSequence(
		'imageClean',
		'imageCopy',
		'reload',
		cb
	);
});

gulp.task('watch', () => {
	gulp.watch(['src/js/**/*'], ['webpack']);
	gulp.watch(['src/stylus/**/*'], ['stylus']);
	gulp.watch(['src/pug/**/*', 'src/yaml/**/*'], ['pugDest']);
	gulp.watch(['src/img/**/*'], ['imageDest']);
	gulp.watch(['src/php/**/*'], ['phpDest']);
});
