var gulp = require('gulp');
var browserify = require('gulp-browserify');
var  autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');


gulp.task('sass', function () {
    return gulp.src('src/sass/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream());
});

gulp.task('copyimg', function () {
    return gulp
        .src('src/img/*')
        .pipe(gulp.dest('./public/img'));
});

gulp.task('server',['sass'], function () {
    browserSync.init({
        port: 4000,
        server: {
            baseDir: './'
        }
    });

    gulp.watch("src/sass/**/*.scss", ['sass']);
    gulp.watch("index.html").on('change', browserSync.reload);

});

gulp.task('default', ['server','copyimg']);