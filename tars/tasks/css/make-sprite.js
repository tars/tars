'use strict';

const gulp = tars.packages.gulp;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;

const staticFolderName = tars.config.fs.staticFolderName;
const imagesFolderName = tars.config.fs.imagesFolderName;
const usedDpiArray = tars.config.useImagesForDisplayWithDpi;
const preprocExtension = tars.cssPreproc.mainExt;
const preprocName = tars.cssPreproc.name;

/**
 * Make sprite and styles for this sprite
 */
module.exports = () => {

    return gulp.task('css:make-sprite', () => {
        const dpiLength = usedDpiArray.length;

        var spriteData = [];
        var dpi192 = false;
        var dpi288 = false;
        var dpi384 = false;

        usedDpiArray.forEach(dpiValue => {
            switch (dpiValue) {
                case 192:
                    dpi192 = true;
                    break;
                case 288:
                    dpi288 = true;
                    break;
                case 384:
                    dpi384 = true;
                    break;
                default:
                    break;
            }
        });

        /* eslint-disable no-loop-func */

        for (let i = 0; i < dpiLength; i++) {
            spriteData.push(gulp.src(
                    './markup/' + staticFolderName + '/' + imagesFolderName
                    + '/sprite/' + usedDpiArray[i] + 'dpi/*.png'
                )
                .pipe(plumber({
                    errorHandler: error => {
                        notifier.error('An error occurred while making png-sprite.', error);
                    }
                }))
                .pipe(
                    tars.require('gulp.spritesmith')(
                        {
                            imgName: 'sprite.png',
                            cssName: 'sprite_' + usedDpiArray[i] + '.' + preprocExtension,
                            Algorithms: 'diagonal',
                            cssOpts: {
                                dpi192,
                                dpi288,
                                dpi384
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
                        './dev/' + staticFolderName + '/' + imagesFolderName
                        + '/png-sprite/' + usedDpiArray[i] + 'dpi/'
                    )
                )
                .pipe(
                    notifier.success('Sprite img with dpi = ' + usedDpiArray[i] + ' is ready')
                );
        }

        /* eslint-enable no-loop-func */

        // Returns css for dpi 96
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
