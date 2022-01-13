const gulp = require('gulp');
const sass =  require('gulp-sass')(require('sass'));

function compileSass() {
    return gulp.src('./src/scss/*.scss') // o ' * ' pega todos os arquivos com a extensão scss
    .pipe(sass({
        outputStyle: 'compressed',
    }))
    .pipe(gulp.dest('./src/css'));
}

gulp.task('sass', compileSass);