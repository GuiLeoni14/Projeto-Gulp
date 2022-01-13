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
    .pipe(gulp.dest('./src/css/'));
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
};

gulp.task('default', watch);