import browserSync from "browser-sync";
import paths from "../config";

export const server = () => {
	browserSync({
		server: {
			baseDir: `${paths.dest}`
		},
		ghostMode: {
			clicks: false,
			forms: false,
			scroll: false
		},
		open: "external",
		online: true,
		port: 3000
	});
};

export const reload = (done) => {
	browserSync.reload();
	done();
};
