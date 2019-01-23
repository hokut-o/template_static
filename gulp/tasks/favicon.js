import gulp from 'gulp'
import realFavicon from 'gulp-real-favicon'
import rename from 'gulp-rename'
import html2jade from 'gulp-html2jade'
import runSequence from 'run-sequence'
import fs from 'fs'
import paths from '../config'

// favicon用マークアップ記述ファイル
const FAVICON_DATA_FILE = 'faviconData.json';

// favicon生成タスク
gulp.task('favicon-generate', function(done) {
	realFavicon.generateFavicon({
		masterPicture: `${paths.favicon_src}favicon.png`,
		dest: `${paths.img_src}favicon`,
		iconsPath: '/',
		design: {
			ios: {
				pictureAspect: 'backgroundAndMargin',
				backgroundColor: '#ffffff',
				margin: '14%',
				assets: {
					ios6AndPriorIcons: false,
					ios7AndLaterIcons: false,
					precomposedIcons: false,
					declareOnlyDefaultIcon: true
				},
				appName: 'foo'
			},
			desktopBrowser: {},
			windows: {
				pictureAspect: 'noChange',
				backgroundColor: '#062854',
				onConflict: 'override',
				assets: {
					windows80Ie10Tile: false,
					windows10Ie11EdgeTiles: {
						small: false,
						medium: true,
						big: false,
						rectangle: false
					}
				},
				appName: 'foo'
			},
			androidChrome: {
				pictureAspect: 'noChange',
				themeColor: '#ffffff',
				manifest: {
					name: 'foo',
					display: 'standalone',
					orientation: 'notSet',
					onConflict: 'override',
					declared: true
				},
				assets: {
					legacyIcon: false,
					lowResolutionIcons: false
				}
			},
			safariPinnedTab: {
				pictureAspect: 'blackAndWhite',
				threshold: 57.03125,
				themeColor: '#062854'
			}
		},
		settings: {
			scalingAlgorithm: 'Mitchell',
			errorOnImageTooSmall: false,
			readmeFile: false,
			htmlCodeFile: false,
			usePathAsIs: false
		},
		markupFile: FAVICON_DATA_FILE
	}, function() {
		done();
	});
});

// favicon読み込み用のpugファイルを生成します
gulp.task('favicon-markup', function() {
	return gulp.src(`${paths.template_src}favicon/favicon.html`)
	.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
	.pipe(html2jade())
	.pipe(rename({
		extname: '.pug'
	}))
	.pipe(gulp.dest(`${paths.pug_include}`))
});

gulp.task('favicon', (cb) => {
	return runSequence(
		'favicon-generate',
		'favicon-markup',
		cb
	);
});
