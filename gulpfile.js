// DEPENDENCIES
// gulp
var gulp = require("gulp");
const { series } = require("gulp");
// rollup
const gru2 = require("gulp-rollup-2");
// @rollup/plugin-babel
const { babel } = require('@rollup/plugin-babel');
// gulp-terser
const terser = require('gulp-terser');
// browser-sync
var browserSync = require("browser-sync").create();

function server() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("./src/**/*.js", js).on("change", browserSync.reload);
}

function js(cb) {
    return gulp.src("./src/script.js")
    .pipe(gru2.rollup({
        input: "src/script.js",
        output: {
            file: "bundle.js",
            format: "iife"
        },
        plugins: [babel({ babelHelpers: 'bundled' })]
    }))
    .pipe(terser())
    .pipe(gulp.dest("./dist"))
}

exports.dev = series(js, server);
exports.js = js;