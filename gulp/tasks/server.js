import gulp from 'gulp';
import browserSync from 'browser-sync';
import connect from "gulp-connect-php";
import paths from '../config';

// gulp.task('server', () => {
// 	browserSync({
// 		server: {
// 			baseDir: paths.dest,
// 		},
// 		ghostMode: {
// 			clicks: false,
// 			forms: false,
// 			scroll: false
// 		},
// 		open: 'external',
// 		online: true,
// 		port: 3000
// 	})
// });

//php
gulp.task('server', () => {
	connect.server({
		port: 8001,
		base: paths.dest
	}, () => {
		browserSync({
			ghostMode: {
				clicks: false,
				forms: false,
				scroll: false
			},
			open: 'external',
			online: true,
			proxy: 'localhost:8001'

		});
	});
});