const {
  src, dest, series, task,
} = require('gulp');
const del = require('del');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

function clean(cb) {
  return del(['dist'], cb);
}

// 输出 js 到 dist目录
function toJs() {
  return src('src/**/*.ts')
    .pipe(tsProject())
    .pipe(dest('dist'));
}

const build = series(clean, toJs);
task('build', build);
exports.build = build;
