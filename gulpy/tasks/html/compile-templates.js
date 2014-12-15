var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var projectConfig = require('../../../projectConfig');
var notifyConfig = projectConfig.notifyConfig;
var replace = require('gulp-replace-task');
var modifyDate = require('../../helpers/modifyDateFormatter');
var browserSync = require('browser-sync');
var fs = require('fs');
var Handlebars = require('gulp-compile-handlebars/node_modules/handlebars');
var handlebars = require('gulp-compile-handlebars');
var digits = require('digits');
var through2 = require('through2');

var handlebarsOptions = {
        batch: ['./markup/modules'],
        helpers: {
            repeat: function(n, options) {
                options = options || {};
                var _data = {},
                    content = '',
                    count = n - 1;

                if (options._data) {
                    _data = Handlebars.createFrame(options._data);
                }

                for (var i = 0; i <= count; i++) {
                    _data = {
                        index: digits.pad((i + 1), {auto: n})
                    };
                    content += options.fn(this, {data: _data});
                }
                return new Handlebars.SafeString(content);
            }
        }
    };

/**
 * Handlebars compilation of pages templates.
 * Templates with _ prefix won't be compiled
 * @param  {Object} buildOptions
 */
module.exports = function(buildOptions) {

    function concatModulesData() {
        eval('var readyModulesData = {' + fs.readFileSync('./dev/temp/modulesData.js', "utf8") + '}');
        return readyModulesData;
    }

    var patterns = [];

    if (!gutil.env.ie8) {
        patterns.push(
            {
                match: '<link href="%=staticPrefix=%/css/main_ie8%=hash=%%=min=%.css" rel="stylesheet" type="text/css">',
                replacement: ''
            }
        );
    }

    if (!gutil.env.ie9) {
        patterns.push(
            {
                match: '<link href="%=staticPrefix=%/css/main_ie9%=hash=%%=min=%.css" rel="stylesheet" type="text/css">',
                replacement: ''
            }
        );
    }

    if (gutil.env.min || gutil.env.release) {
        patterns.push(
            {
                match: '%=min=%',
                replacement: '.min'
            }
        );
    } else {
        patterns.push(
            {
                match: '%=min=%',
                replacement: ''
            }
        );
    }

    if (gutil.env.release) {
        patterns.push(
            {
                match: '%=hash=%',
                replacement: buildOptions.hash
            }
        );
    } else {
        patterns.push(
            {
                match: '%=hash=%',
                replacement: ''
            }
        );
    }

    patterns.push(
        {
            match: '%=staticPrefix=%',
            replacement: projectConfig.staticPrefix
        }
    );

    return gulp.task('compile-templates', function(cb) {
        var modulesData, error;

        try {
            modulesData = concatModulesData();
        } catch(er) {
            error = er;
        }

        gulp.src(['./markup/pages/**/*.html', '!./markup/pages/**/_*.html'])
            .pipe(error ? through2(function () {this.emit("error", error)}) : handlebars(modulesData, handlebarsOptions))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while compiling handlebars.\nLook in the console for details.\n' + error;
            }))
            .pipe(replace({
              patterns: patterns,
              usePrefix: false
            }))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while replacing placeholdres.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest('./dev/'))
            .pipe(browserSync.reload({stream:true}))
            .pipe(
                gulpif(notifyConfig.useNotify,
                    notify({
                        onLast: true,
                        sound: notifyConfig.sounds.onSuccess,
                        title: notifyConfig.title,
                        message: 'Templates\'ve been compiled \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                        templateOptions: {
                            date: modifyDate.getTimeOfModify()
                        }
                    })
                )
            );

        cb(null);
    });
};