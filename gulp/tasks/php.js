import gulp from 'gulp';
import paths from '../config';

gulp.task('phpdest', () => {
	return gulp.src(paths.php_src + '**/*.php')
	.pipe(gulp.dest(paths.dest));
});