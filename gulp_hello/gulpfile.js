const gulp = require('gulp');
const babel = require("gulp-babel");

const jsTask = async () => {
    return gulp.src('./src/**/*.js')
    .pipe(babel())
    // .pipe(terser({mangle: {toplevel: true }}))
    .pipe(gulp.dest("./dist"))
}
module.exports = {
    jsTask
}