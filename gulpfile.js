// @TODO: Использовать gulp-util на полную
var gulp = require('gulp'), // Сообственно Gulp JS
    jade = require('gulp-jade'), // Плагин для Jade
    sass = require('gulp-sass'), // Плагин для scss
    uglify = require('gulp-uglifyjs'), // Минификация JS
    csso = require('gulp-csso'), // Минификация css
    concat = require('gulp-concat'), // Склейка файлов
    spritesmith = require('gulp.spritesmith'), // Склейка спрайтов
    clean = require('gulp-clean'), // Удаление файлов
    path = require('path'), // Управление путями
    rename = require('gulp-rename'), // Переименовывание файлов
    jshint = require('gulp-jshint'), // Следим за js
    stripDebug = require('gulp-strip-debug'), // Вырезаем console.log, debugger
    autoprefix = require('gulp-autoprefixer'), // Автопрефиксер для css
    jscs = require('gulp-jscs'),
    gutil = require('gulp-util'),
    cache = require('gulp-cached'),
    runSequence = require('run-sequence'),

    dev = gutil.env.dev,
    relese = gutil.env.dev,
    all = gutil.env.all,
    build = gutil.env.build,

    // Пути, для копирования файлов изx dev в build
    // @TODO: Избавиться от этого треша!!!
    filesToMove = [
        './public/*.*',
        './public/**/*.*',
        './public/**/**/*.*',
        './public/**/**/**/*.*',
        './public/**/**/**/**/*.*',
        './public/**/**/**/**/**/*.*'
    ]; 


    cache.caches = {};

function clearCaches() {
    delete cache.caches['linting', 'move-assets', 'move-content-img', 'move-plugins-img'];
}    

// Собираем спрайт
gulp.task('sprite', function () {
  var spriteData = gulp.src('./images/for-sprite/*.png')

    .pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.scss'
  }));
  spriteData.img.pipe(gulp.dest('./public/img/'));
  spriteData.css.pipe(gulp.dest('./markup/scss/'));
});

// Собираем Scss для всех браузеров
gulp.task('scss', function() {
    gulp.src('./markup/*.scss')
        .pipe(sass())
        .on('error', gutil.log) // Если есть ошибки, выводим и продолжаем
    .pipe(autoprefix('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4', { cascade: true })) 
    .on('error', gutil.log) // Если есть ошибки, выводим и продолжаем
    .pipe(gulp.dest('./public/css/'));
});

// Собираем Jade
gulp.task('jade', function() {
    return gulp.src('./markup/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .on('error', gutil.log) // Если есть ошибки, выводим и продолжаем
    .pipe(gulp.dest('./public/'));
});

// Собираем JS доп. библиотек и плагинов, которые должны быть в отдельных файлах
gulp.task('vendors-js', function() {
    return gulp.src('./js/vendors/*.js')
        .on('error', gutil.log) // Если есть ошибки, выводим и продолжаем
        .pipe(gulp.dest('./public/js/vendors'));
});

// Собираем JS модулей и плагинов
gulp.task('plugins-and-modules-js', ['lint'], function() {
    return gulp.src(['./js/plugins/*.js', './js/plugins/**/*.js', './markup/modules/**/*.js'])
        .pipe(concat('main.js'))
        .on('error', gutil.log) // Если есть ошибки, выводим и продолжаем
        .pipe(gulp.dest('./public/js'));
});

// Проверяем JS
gulp.task('lint', function() {
  return gulp.src('./markup/modules/**/*.js')
    .pipe(cache('linting'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jscs());
});

// Переносим картинки из assets модулей
gulp.task('move-assets', function(){
    return gulp.src('./markup/modules/**/assets/*.*')
        .pipe(cache('move-assets'))
        .pipe(rename(function(path) {
            path.dirname = path.dirname.replace(new RegExp("[a-zA-Z0-9]+\/assets",'g'), '');
        }))
        .on('error', gutil.log) // Если есть ошибки, выводим и продолжаем
        .pipe(gulp.dest('./public/img/assets'));
}); 

// Переносим картинки из папки content
gulp.task('move-content-img', function(){
    return gulp.src('./images/content/*.*')
        .pipe(cache('move-content-img'))
        .on('error', gutil.log) // Если есть ошибки, выводим и продолжаем
        .pipe(gulp.dest('./public/img/content'));
});

// Переносим картинки из папки for-plugins
gulp.task('move-plugins-img', function(){
    return gulp.src(['./images/for-plugins/*.*', './images/for-plugins/**/*.*'])
        .pipe(cache('move-plugins-img'))
        .on('error', gutil.log) // Если есть ошибки, выводим и продолжаем
        .pipe(gulp.dest('./public/img/for-plugins'));
});

// Вырезаем console.log и debugger
gulp.task('strip-debug', function() {
    return gulp.src('./build/js/main.js')
        .pipe(stripDebug())
        .on('error', gutil.log) // Если есть ошибки, выводим и продолжаем
        .pipe(gulp.dest('./build/js/'));
});

// Сжимаем весь main.js на продакшене, кроме vendors
// Вырезаем console.log и т.п.
gulp.task('compress-main-js', ['strip-debug'], function() {
    return gulp.src('./build/js/main.js')
        .pipe(uglify('main.min.js', {
            mangle: false
        }))
        .on('error', gutil.log) // Если есть ошибки, выводим и продолжаем
        .pipe(gulp.dest('./build/js/'));
});

// Сжимаем css
gulp.task('compress-css', function() {
    return gulp.src('./build/css/main.css')
        .pipe(csso('main.min.css'))
        .pipe(rename({
            suffix: ".min"
        }))
        .on('error', gutil.log) // Если есть ошибки, выводим и продолжаем
        .pipe(gulp.dest('./build/css/'));
})

// Переносим файлы из рабзработки в продакшн
gulp.task('pre-build', ['clean-build'], function(){
    return gulp.src(filesToMove, { base: './public/' })
        .on('error', gutil.log) // Если есть ошибки, выводим и продолжаем
        .pipe(gulp.dest('./build'));
});

// Чистим директорию для продакшена 
gulp.task('clean-build', function() {
    return gulp.src('./build/', {read: false})
        .on('error', gutil.log) // Если есть ошибки, выводим и продолжаем
        .pipe(clean());
});

// Чистим директорию для разработки 
gulp.task('clean-dev', function() {
    clearCaches();

    return gulp.src('./public/', {read: false})
        .on('error', gutil.log) // Если есть ошибки, выводим и продолжаем
        .pipe(clean());
});

// Чистим и продакшн и разработку
gulp.task('clean-all', ['clean-dev', 'clean-build'], function() {
});

// Сборка версии для разработки без вотчеров
gulp.task('build-dev', function(callback) {
    runSequence(
        'clean-dev',
        'sprite',
        'scss', 
        [
            'vendors-js', 
            'plugins-and-modules-js', 
            'jade',
            'move-assets',
            'move-content-img',
            'move-plugins-img'
        ], 
        callback
    );
});

// Запуск gulp dev
gulp.task('dev', function() {
    // Предварительная сборка проекта
    gulp.start('build-dev');

    gulp.watch('./images/for-sprite/*.png', function() {
        gulp.start('sprite');
    });    
    gulp.watch(['./markup/**/**/*.scss', './markup/*.scss'], function() {
        gulp.start('scss');
    });
    gulp.watch(['./markup/*.jade', './markup/**/**/*.jade'], function() {
        gulp.start('jade');
    });
    gulp.watch('./markup/modules/**/*.js', function() {
        gulp.start('plugins-and-modules-js');
    });
    gulp.watch('./js/plugins/*.js', function() {
        gulp.start('plugins-and-modules-js');
    });
    gulp.watch('./markup/modules/**/assets/*.*', function() {
        gulp.start('move-assets');
    });
    gulp.watch('./images/content/*.*', function() {
        gulp.start('move-content-img');
    });
    gulp.watch(['./images/for-plugins/*.*', './images/for-plugins/**/*.*'], function() {
        gulp.start('move-plugins-img');
    });
});

// Сборка всей верстки на выкладку
gulp.task('build', ['pre-build'], function() {
    gulp.start('strip-debug');
    gulp.start('compress-main-js');
    gulp.start('compress-css'); 
});