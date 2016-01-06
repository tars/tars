'use strict';

const gulp = tars.packages.gulp;
const spritesmith = tars.packages.spritesmith;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;
const skipTaskWithEmptyPipe = tars.helpers.skipTaskWithEmptyPipe;

const staticFolderName = tars.config.fs.staticFolderName;
const imagesFolderName = tars.config.fs.imagesFolderName;
const dpi = tars.config.useImagesForDisplayWithDpi;
const preprocExtension = tars.cssPreproc.mainExt;
const preprocName = tars.cssPreproc.name;

/**
 * Make sprite and styles for this sprite
 */
module.exports = function () {

    return gulp.task('css:make-sprite', function (cb) {

        const dpiLength = dpi.length;

        var spriteData = [];
        var dpi192 = false;
        var dpi288 = false;
        var dpi384 = false;
        var i = 0;

        for (i = 0; i < dpiLength; i++) {
            if (dpi[i] === 192) {
                dpi192 = true;
            } else if (dpi[i] === 288) {
                dpi288 = true;
            } else if (dpi[i] === 384) {
                dpi384 = true;
            }
        }

        /* eslint-disable no-loop-func */

        for (i = 0; i < dpiLength; i++) {
            spriteData.push(gulp.src(
                    './markup/' + staticFolderName + '/' + imagesFolderName + '/sprite/' + dpi[i] + 'dpi/*.png'
                )
                .pipe(plumber({
                    errorHandler: function (error) {
                        notifier.error('An error occurred while making png-sprite.', error);
                    }
                }))
                .pipe(skipTaskWithEmptyPipe('css:make-sprite', cb))
                .pipe(
                    tars.require('gulp.spritesmith')(
                        {
                            imgName: 'sprite.png',
                            cssName: 'sprite_' + dpi[i] + '.' + preprocExtension,
                            Algorithms: 'diagonal',
                            cssOpts: {
                                dpi192: dpi192,
                                dpi288: dpi288,
                                dpi384: dpi384
                            },
                            padding: (i + 1) * 4,
                            cssTemplate: './markup/' + staticFolderName + '/'
                                            + preprocName + '/sprite-generator-templates/'
                                            + preprocName + '.sprite.mustache'
                        }
                    )
                )
            );

            spriteData[i].img
                .pipe(
                    gulp.dest(
                        './dev/' + staticFolderName + '/' + imagesFolderName + '/png-sprite/' + dpi[i] + 'dpi/'
                    )
                )
                .pipe(
                    notifier.success('Sprite img with dpi = ' + dpi[i] + ' is ready')
                );
        }

        /* eslint-enable no-loop-func */

        return spriteData[0].css
                .pipe(
                    gulp.dest('./markup/' + staticFolderName + '/' + preprocName + '/sprites-' + preprocName + '/')
                )
                .pipe(
                    notifier.success(
                        preprocName.charAt(0).toUpperCase() + preprocName.slice(1) + ' for sprites is ready'
                    )
                );
    });
};
