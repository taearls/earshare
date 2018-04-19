const gulp = require("gulp");
const less = require("gulp-less");

gulp.task("less", () => {
	// find the file we want to convert
	// then we need to convert
	// then we need to send it to where we want
	gulp.src("./public/less/style.less")
		.pipe(less())
		.pipe(gulp.dest("./public/css/"));
})

gulp.task("watch", () => {
	gulp.watch(["./public/less/**/*.less"], ["less"]);
})

gulp.task("default", ["less", "watch"]);