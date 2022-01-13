const gulp = require('gulp');
const sass =  require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

function compileSass() {
    return gulp.src('./src/scss/*.scss') // o ' * ' pega todos os arquivos com a extensão scss
    .pipe(sass({
        outputStyle: 'compressed',
    }))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false,
    }))
    .pipe(gulp.dest('./src/css/'))
    .pipe(browserSync.stream()); // injeta o css na página sem precisar dar refresh
}

gulp.task('default', compileSass); // gulp.task('sass', compileSass);

function browser() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
}

gulp.task('browser-sync', browser);

function watch() {
    gulp.watch('./src/scss/*.scss', compileSass); // gulp.series'ou parallel'('sass', 'outra-tarefa');
    gulp.watch('*.html').on('change', browserSync.reload); // browserSync.reload atualiza á pagina inteira
};
gulp.task('watch', watch);
gulp.task('default', gulp.parallel('watch', 'browser-sync'));