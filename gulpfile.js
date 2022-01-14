const gulp = require('gulp');
const sass =  require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');

// compila os arquivos sass para a pasta 'css/main.css'
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

gulp.task('sass', compileSass); // gulp.task('sass', compileSass);

// inicia um servidor local a partir da raiz do projeto './'
function browser() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
}

// compacta os arquivos js para 'js/all.js'
function gulpJs(){
    return  gulp.src('./src/js/scripts/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./src/js'))
}

gulp.task('allJs', gulpJs);
gulp.task('browser-sync', browser);

// espera uma atualização para realizar um tarefa sem precisar reiniciar o gulp
function watch() {
    gulp.watch('./src/scss/*.scss', compileSass); // gulp.series'ou parallel'('sass', 'outra-tarefa');
    gulp.watch('*.html').on('change', browserSync.reload); // browserSync.reload atualiza á pagina inteira
    gulp.watch('./src/js/all.js').on('change', browserSync.reload); // adicionado por min
    gulp.watch('./src/js/scripts/*.js', gulpJs);
};
gulp.task('watch', watch);
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'allJs')); // nome das tarefas a serem executadas ao iniciar o gulp