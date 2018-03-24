import gulp       from 'gulp';
import runSequence from 'run-sequence';

gulp.task('default', (cb) => {
	return runSequence(
		['pug','stylus','webpack'],
		'imageClean',
		'imageCopy',
		'watch',
		'server',
	cb
	);
});
