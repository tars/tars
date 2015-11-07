'use strict';

var gulp = tars.packages.gulp;
var gutil = tars.packages.gutil;
var spritesmith = tars.packages.spritesmith;
var plumber = tars.packages.plumber;
var notifier = tars.helpers.notifier;
var skipTaskWithEmptyPipe = tars.helpers.skipTaskWithEmptyPipe;

var staticFolderName = tars.config.fs.staticFolderName;
var imagesFolderName = tars.config.fs.imagesFolderName;
var preprocExtension = tars.cssPreproc.mainExt;
var preprocName = tars.cssPreproc.name;

/**
 * Make sprite for svg-fallback and styles for this sprite
 * Return pipe with styles for sprite
 */
module.exports = function () {
    return gulp.task('css:make-fallback-for-svg', function (cb) {
        var spriteData = '';

        if (tars.config.useSVG && (tars.flags.ie8 || tars.flags.ie)) {

            spriteData = gulp.src('./dev/' + staticFolderName + '/' + imagesFolderName + '/rastered-svg-images/*.png')
                .pipe(plumber({
                    errorHandler: function (error) {
                        notifier.error('An error occurred while making fallback for svg.', error);
                    }
                }))
                .pipe(skipTaskWithEmptyPipe('css:make-fallback-for-svg', cb))
                .pipe(
                    spritesmith(
                        {
                            imgName: 'svg-fallback-sprite.png',
                            cssName: 'svg-fallback-sprite.' + preprocExtension,
                            Algorithms: 'diagonal',
                            cssTemplate: './markup/' + staticFolderName
                                            + '/' + preprocName + '/sprite-generator-templates/'
                                            + preprocName + '.svg-fallback-sprite.mustache'
                        }
                    )
                );

            spriteData.img
                .pipe(
                    gulp.dest('./dev/' + staticFolderName + '/' + imagesFolderName + '/rastered-svg-sprite/')
                )
                .pipe(
                    notifier.success('Sprite-img for svg is ready!')
                );

            return spriteData.css
                    .pipe(
                        gulp.dest(
                            './markup/' + staticFolderName + '/' + preprocName + '/sprites-' + preprocName + '/'
                        )
                    )
                    .pipe(
                        notifier.success(
                            preprocName.charAt(0).toUpperCase() + preprocName.slice(1) + ' for svg-sprite is ready'
                        )
                    );

        } else {
            tars.skipTaskLog('css:make-fallback-for-svg', 'Svg-fallback is not used');
            cb(null);
        }
    });
};
