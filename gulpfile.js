// Using modules
var gulp = require('gulp'),                     // Gulp JS
    jade = require('gulp-jade'),                // Jade compilation
    sass = require('gulp-sass'),                // Scss compilation
    uglify = require('gulp-uglifyjs'),          // JS minify
    csso = require('gulp-csso'),                // Css minify
    concat = require('gulp-concat'),            // Files concat
    spritesmith = require('gulp.spritesmith'),  // Sprite generator
    rimraf = require('gulp-rimraf'),            // Clean module
    path = require('path'),                     // Path module
    rename = require('gulp-rename'),            // File rename
    jshint = require('gulp-jshint'),            // JS linter
    stripDebug = require('gulp-strip-debug'),   // Console.log and debugger striper
    autoprefix = require('gulp-autoprefixer'),  // Autoprefixer for css
    jscs = require('gulp-jscs'),                // JS-style checker
    gutil = require('gulp-util'),               // Gulp util module
    cache = require('gulp-cached'),             // Gulp cache module
    runSequence = require('run-sequence'),      // Run sequence module for run task in queue
    run = require('gulp-run'),                  // Run bash-scripts from gulp
    gulpif = require('gulp-if'),                // Gulp if module
    minimatch = require('minimatch'),           // Service nodule for node-watch
    watch = require('node-watch'),              // Watcher

    // Env vars
    gf = gutil.env.gf,                          // Generate font-files or not
    ms = gutil.env.ms,                          // Use builder in Windows

    buildVersion = '',                          // build version var

    // Paths for copy files from dev to build directory
    // @TODO: Remove this stuff!!!
    filesToMove = [
        './dev/*.*',
        './dev/**/*.*',
        './dev/**/**/*.*',
        './dev/**/**/**/*.*',
        './dev/**/**/**/**/*.*',
        './dev/**/**/**/**/**/*.*'
    ]; 

    // Cache for cache module
    cache.caches = {};

// Clear cache
function clearCaches() {
    delete cache.caches['linting', 'move-assets', 'move-content-img', 'move-plugins-img'];
}

// Watcher by node-watch
var watchByPattern = (function() {
  var parsePattern = function(input) {
    var current = './';
    var segments = input.split(/\*/);
    return {
      dir: (/^\*/.test(input) ? current : (segments[0] || current)),
      pat: ('*' + segments.slice(1).join('*'))
    }
  }
  var watchStack = {}
  return function(pattern, fn) {
    var input = parsePattern(pattern);
    var stack = { pat: input.pat, callback: fn };
    if (watchStack[input.dir]) {
      watchStack[input.dir].push(stack);
    } else {
      watchStack[input.dir] = [stack];
      watch(input.dir, function(filename) {
        watchStack[input.dir].forEach(function(stack) {
          if (minimatch(filename, stack.pat)) {
            stack.callback(filename);
          }
        });
      });
    };
  }
}());

// Notify for changed files
function fileChangedNotify(filename) {
    gutil.log('file: "',filename,'" was changed');
}
 

// Sprite task
gulp.task('make-sprite', function () {
  var spriteData = gulp.src('./images/sprite/*.png')

    .pipe(spritesmith({
        imgName: 'sprite.png',
        imgPath: '../img/sprite.png',
        cssName: 'sprite.scss',
        padding: 4
  }));
  spriteData.img.pipe(gulp.dest('./dev/img/'));
  spriteData.css.pipe(gulp.dest('./markup/scss/'));
});

// Scss compilation
gulp.task('compile-scss', function() {
    gulp.src('./markup/*.scss')
        .pipe(sass())
        .on('error', gutil.log) // Output errors and continue
    .pipe(autoprefix('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4', { cascade: true })) 
    .on('error', gutil.log) // Output errors and continue
    .pipe(gulp.dest('./dev/css/'));
});

// Jade compilation
gulp.task('compile-jade', function() {
    return gulp.src('./markup/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .on('error', gutil.log) // Output errors and continue
    .pipe(gulp.dest('./dev/'));
});

// Copy JS-files for libs that have to be in separate files
gulp.task('copy-vendors-js', function() {
    return gulp.src('./js/vendors/*.js')
        .on('error', gutil.log) // Output errors and continue
        .pipe(gulp.dest('./dev/js/vendors'));
});

// Concat JS for modules and plugins to 1 file
gulp.task('concat-lint-plugins-and-modules-js', ['lint'], function() {
    return gulp.src(['./js/plugins/*.js', './js/plugins/**/*.js', './markup/modules/**/*.js'])
        .pipe(concat('main.js'))
        .on('error', gutil.log) // Output errors and continue
        .pipe(gulp.dest('./dev/js'));
});

// Check JS (style and errors)
gulp.task('lint', function() {
  return gulp.src('./markup/modules/**/*.js')
    .pipe(cache('linting'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jscs());
});

// Move images from assets modules of modules
gulp.task('move-assets', function(){
    return gulp.src('./markup/modules/**/assets/*.*')
        .pipe(cache('move-assets'))
        .pipe(rename(function(path) {
            path.dirname = path.dirname.replace(new RegExp("[a-zA-Z0-9]+\/assets",'g'), '');
        }))
        .on('error', gutil.log) // Output errors and continue
        .pipe(gulp.dest('./dev/img/assets'));
}); 

// Move images for content
gulp.task('move-content-img', function(){
    return gulp.src('./images/content/*.*')
        .pipe(cache('move-content-img'))
        .on('error', gutil.log) // Output errors and continue
        .pipe(gulp.dest('./dev/img/content'));
});

// Move images for plugins
gulp.task('move-plugins-img', function(){
    return gulp.src(['./images/plugins/*.*', './images/plugins/**/*.*'])
        .pipe(cache('move-plugins-img'))
        .on('error', gutil.log) // Output errors and continue
        .pipe(gulp.dest('./dev/img/plugins'));
});


// Generate font-files (eot, woff, svg) from .ttf-file
gulp.task('generate-fonts', function () {
  return gulp.src('./fonts/')             
            .pipe(gulpif(gf, run('webfonts "./dev/fonts/"')));
});

// Move ttf-files fonts to dev directory
gulp.task('move-fonts', function(){
    return gulp.src('./fonts/*.*')
        .on('error', gutil.log) // Output errors and continue
        .pipe(gulp.dest('./dev/fonts'));
});

// Strip console.log and debugger from main.js
gulp.task('strip-debug', function() {
    return gulp.src('./build' + buildVersion + '/js/main.js')
        .pipe(stripDebug())
        .on('error', gutil.log) // Output errors and continue
        .pipe(gulp.dest('./build' + buildVersion + '/js/'));
});

// Compress js-files (and start 'strip-debug' task)
gulp.task('compress-main-js', ['strip-debug'], function() {
    return gulp.src('./build' + buildVersion + '/js/main.js')
        .pipe(uglify('main.min.js', {
            mangle: false
        }))
        .on('error', gutil.log) // Output errors and continue
        .pipe(gulp.dest('./build' + buildVersion + '/js/'));
});

// Compress css
gulp.task('compress-css', function() {
    return gulp.src('./build' + buildVersion + '/css/main.css')
        .pipe(csso('main.min.css'))
        .pipe(rename({
            suffix: ".min"
        }))
        .on('error', gutil.log) // Output errors and continue
        .pipe(gulp.dest('./build' + buildVersion + '/css/'));
})

// Copy files from dev to build directory
// Create build directory with new build version
gulp.task('pre-build', function(){
    buildVersion = '_ver-' + (new Date()).toString();
    buildVersion = buildVersion.replace(/ /g,'_');

    gutil.log('Build version is: ',buildVersion);

    return gulp.src(filesToMove, { base: './dev/' })
        .on('error', gutil.log) // Output errors and continue
        .pipe(gulp.dest('./build' + buildVersion));
});

// Clean dev directory and cache
gulp.task('clean', function() {
    clearCaches();

    return gulp.src('./dev/', {read: false})
        .on('error', gutil.log) // Output errors and continue
        .pipe(rimraf());
});

// Build dev-version (without watchers)
gulp.task('build-dev', function(cb) {
    runSequence(
        'clean',
        'make-sprite',
        'compile-scss', 
        [
            'copy-vendors-js', 
            'concat-lint-plugins-and-modules-js', 
            'compile-jade',
            'move-assets',
            'move-content-img',
            'move-plugins-img'
        ],
        'move-fonts',
        'generate-fonts',
        cb
    );
});

// Task to init project. Create FS
gulp.task('init', function() {
    gulp.src('')
        .pipe(gulpif(ms, 
            run('mkdir js\plugins images images\content images\plugins images\sprite fonts markup\modules\_template\assets'), 
            run('mkdir js/plugins images images/content images/plugins images/sprite fonts markup/modules/_template/assets')
            )
        );
});

// Build dev-version with watchers
gulp.task('dev', function() {
    gulp.start('build-dev');

    // Watch for images for sprite
    watchByPattern('./images/sprite/**/*.png', function(filename) {
        fileChangedNotify(filename);
        gulp.start('make-sprite'); 
    });

    // Watch for modules' scss-files
    watchByPattern('./markup/**/**/*.scss', function(filename) {
        fileChangedNotify(filename);
        gulp.start('compile-scss');
    }); 

    // Watch for main scss-files
    watchByPattern('./markup/modules/**/*.scss', function(filename) {
        fileChangedNotify(filename);
        gulp.start('compile-scss');
    });

    // Watch for templates jade-files
    watchByPattern('./markup/**/*.jade', function(filename) {
        fileChangedNotify(filename);
        gulp.start('compile-jade');
    });

    // Watch for modules jade-files
    watchByPattern('./markup/modules/**/*.jade', function(filename) {
        fileChangedNotify(filename);
        gulp.start('compile-jade');
    });

    // Watch for modules js-files
    watchByPattern('./markup/modules/**/*.js', function(filename) {
        fileChangedNotify(filename);
        gulp.start('concat-lint-plugins-and-modules-js');
    });

    // Watch for plugins js-files
    watchByPattern('./js/plugins/**/*.js', function(filename) {
        fileChangedNotify(filename);
        gulp.start('concat-lint-plugins-and-modules-js');
    });

    // Watch for vendors js-files
    watchByPattern('./js/vendors/**/*.js', function(filename) {
        fileChangedNotify(filename);
        gulp.start('copy-vendors-js');
    });

    // Watch for images in assets dir of modules
    watchByPattern('./markup/modules/**/assets/*.*', function(filename) {
        fileChangedNotify(filename);
        gulp.start('move-assets');
    });

    // Watch for content images
    watchByPattern('./images/content/**/*.*', function(filename) {
        fileChangedNotify(filename);
        gulp.start('move-content-img');
    });

    // Watch for plugins images
    watchByPattern('./images/plugins/**/*.*', function(filename) {
        fileChangedNotify(filename);
        gulp.start('move-plugins-img');
    });

    // Default gulp watcher for font files.
    // Need restart gulp dev, if new fonts have been added
    gulp.watch('./fonts/*.*', function(cb) {
        runSequence(
            'move-fonts',
            'generate-fonts',
            cb
        );
    });
});

// Build release version
gulp.task('build', function(cb) {
    runSequence(
        'build-dev',
        'pre-build',
        'strip-debug',
        'compress-main-js',
        'compress-css',
        cb
    );
});