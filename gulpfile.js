const
    autoprefixer    = require('gulp-autoprefixer'),
    browserSync     = require('browser-sync').create(),
    del             = require("del"),
    filter          = require("gulp-filter"),
    gulp            = require('gulp'),
    plumber         = require('gulp-plumber'),
    reload          = browserSync.reload,
    rename          = require("gulp-rename"),
    sass            = require('gulp-sass'),
    sourcemaps      = require('gulp-sourcemaps'),
src = {
    scss: ['src/morpheus-master/sass/*.scss', 'src/sass/*.scss'],
    css:  'examples/css',
    html: 'examples/*.html',
    dist: 'dist',
    devtools: 'devtools/ithaca-test.longsight.com/library/skin/ithaca'
};

// Compile sass into CSS for local
gulp.task('sass-browsersync', ()=>
    gulp.src(src.scss)
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({ overrideBrowserslist: ['last 2 version', '> 5%'] }))
        .pipe(gulp.dest(src.css))
        .pipe(reload({stream: true}))
);
gulp.task('watch-browsersync', ()=> {
    browserSync.init({
        server: {
            baseDir: ["examples", "dist"],
            directory: true
        }
    });
    gulp.watch(src.scss, gulp.series('sass-browsersync'));
    gulp.watch(src.html).on('change', reload);
});
gulp.task('clean-browsersync', ()=>del([src.css+'/**/*']));

// Compile sass into CSS for devtools source override
gulp.task('sass-devtools', ()=> {
    const f = filter(['**/*.css'], { restore: true });
    return gulp.src(src.scss)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({overrideBrowserslist: ['last 2 version', '> 5%']}))
        .pipe(sourcemaps.write('.'))
        .pipe(f)
        .pipe(rename((file)=>{
            file.extname += "%3fversion=12.6";
            return true;
        }))
        .pipe(gulp.dest(src.devtools))
});
gulp.task('watch-devtools', ()=>gulp.watch(src.scss, gulp.series('sass-devtools')));
gulp.task('clean-devtools', ()=>del([src.devtools+'/**/*']));

gulp.task('devtools', gulp.parallel('sass-devtools','watch-devtools'));
gulp.task('default', gulp.parallel('sass-browsersync', 'watch-browsersync'));

gulp.task('dist', ()=>
    gulp.src(src.scss)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({ overrideBrowserslist: ['last 2 version', '> 5%'] }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(src.dist))
);

