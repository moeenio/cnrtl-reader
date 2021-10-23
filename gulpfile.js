var gulp = require("gulp");
const gru2 = require("gulp-rollup-2");
var browserSync = require("browser-sync").create();

function dev(cb) {
    gulp.watch("*.js", function() {
        gulp.task(js)
        .pipe(browserSync.reload());
    })
}

function js(cb) {
    return gulp.src("./script.js")
    .pipe(gru2.rollup({
        input: "script.js",
        output: {
            file: "bundle.js",
            format: "iife"
        }
    }))
    .pipe(gulp.dest("./dist"))
}

exports.dev = dev;
exports.js = js;