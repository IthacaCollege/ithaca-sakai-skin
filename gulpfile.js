'use strict';

const gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    reload      = browserSync.reload,
    src = {
        scss: ['src/morpheus-master/sass/*.scss', 'src/sass/*.scss'],
        css:  'examples/css',
        html: 'examples/*.html'
    };

// Static Server + watching scss/html files
gulp.task('serve', ()=>{
    browserSync.init({
        server: {
            baseDir: ["examples", "dist"],
            directory: true
        }
    });
    gulp.watch(src.scss, gulp.series(['sassTask']));
    gulp.watch(src.html).on('change', reload);
});

// Compile sass into CSS
gulp.task('sassTask', ()=>{
    return gulp.src(src.scss)
        .pipe(sass())
        .pipe(gulp.dest(src.css))
        .pipe(reload({stream: true}));
});

gulp.task('default', gulp.parallel('sassTask', 'serve'));
