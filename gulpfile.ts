import gulp from "gulp";
import less from "gulp-less";
import sourcemaps from "gulp-sourcemaps";
import babel from "gulp-babel";
import mergeStream from "merge-stream";
// @ts-ignore
import livereload from "gulp-livereload";

/* File Globs */
const jsGlob = "./src/scripts/**/*.js";

/* Tasks */
function copyResources() {
  return mergeStream([
    gulp.src("./src/**/*.html").pipe(gulp.dest("./servable/")),
  ]).pipe(livereload());
}
function compileLess() {
  return gulp.src("./src/styles/entry/**/*.less")
    .pipe(less())
    .pipe(gulp.dest("./servable/styles/"))
    .pipe(livereload());
}

function transpileJs() {
  return gulp.src(jsGlob)
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./servable/scripts"))
    .pipe(livereload());
}

function copyJsDeps() {
  gulp.src(
    [
      "node_modules/requirejs/require.js",
      "node_modules/jquery/dist/jquery.js",
      "node_modules/underscore/underscore.js",
      "node_modules/underscore/underscore-umd.js.map",
      "node_modules/backbone/backbone.js",
      "node_modules/handlebars/dist/handlebars.js",
    ]
  ).pipe(gulp.dest("./servable/scripts/"));
}

gulp.task("watch", function() {
  compileLess(); copyResources(); copyJsDeps(); transpileJs();
  gulp.watch("./src/styles/**/*.less", compileLess);
  // @ts-ignore
  gulp.watch(jsGlob, transpileJs);
  gulp.watch("./src/**/*.html", copyResources);
});

function defaultTask(cb: any) {
  cb();
}

export default defaultTask;
