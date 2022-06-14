const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const sourceMaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');


const localhost = 'startmedia'; // нужно использовать название локального домена

const typeScripts = () => {
  return src('ts/**/*.ts')
    .pipe(tsProject())
    .js.pipe(dest('js'));
}

const stylesDev = () => {
  return src('sass/style.scss')
    .pipe(sourceMaps.init())
    .pipe(sass())
    .pipe(cleanCSS({
      level: 2,
      format: {
        breaks: {
          afterAtRule: 2,
          afterBlockBegins: 1,
          afterBlockEnds: 2,
          afterComment: 1,
          afterProperty: 1,
          afterRuleBegins: 1,
          afterRuleEnds: 1,
          beforeBlockEnds: 1,
          betweenSelectors: 0
        },
        indentBy: 2,
        spaces: {
          aroundSelectorRelation: 1,
          beforeBlockBegins: 1,
          beforeValue: 1
        }
      }
    }))
    .pipe(sourceMaps.write())
    .pipe(dest('styles'))
    .pipe(browserSync.stream());
}

const styles = () => {
  return src('sass/style.scss')
    .pipe(sass())
    .pipe(cleanCSS({ level: 1 }))
    .pipe(dest('styles'));
}

const watcherPhp = () => {
  return src('index.php')
    .pipe(browserSync.stream());
}

const watcherTs = () => {
  return src('ts/**/*.ts')
    .pipe(browserSync.stream());
}

const watchFiles = () => {
  browserSync.init({
    proxy: localhost
  });
}

watch('sass/**/*.scss', stylesDev);
watch('**/*.php', watcherPhp);
watch('ts/**/*.ts', watcherTs);


exports.default = series(styles, typeScripts);
exports.dev = series(stylesDev, typeScripts, watchFiles);
