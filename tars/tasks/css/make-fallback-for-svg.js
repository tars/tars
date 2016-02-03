'use strict';

const gulp = tars.packages.gulp;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;
const skipTaskWithEmptyPipe = tars.helpers.skipTaskWithEmptyPipe;
const stringHelper = tars.helpers.stringHelper;

const staticFolderName = tars.config.fs.staticFolderName;
const imagesFolderName = tars.config.fs.imagesFolderName;
const preprocExtension = tars.cssPreproc.mainExt;
const preprocName = tars.cssPreproc.name;

/**
 * Make sprite for svg-fallback and styles for this sprite
 * Return pipe with styles for sprite
 */
module.exports = () => {

    return gulp.task('css:make-fallback-for-svg', cb => {

        if (tars.config.svg.active && tars.config.svg.workflow === 'sprite' && (tars.flags.ie8 || tars.flags.ie)) {
            const spriteData = gulp.src(
                    './dev/' + staticFolderName + '/' + imagesFolderName + '/rastered-svg-images/*.png'
                )
                .pipe(plumber({
                    errorHandler(error) {
                        notifier.error('An error occurred while making fallback for svg.', error);
                    }
                }))
                .pipe(skipTaskWithEmptyPipe('css:make-fallback-for-svg', cb))
                .pipe(
                    tars.require('gulp.spritesmith')(
                        {
                            imgName: 'svg-fallback-sprite' + tars.options.build.hash + '.png',
                            cssName: 'svg-fallback-sprite.' + preprocExtension,
                            Algorithms: 'diagonal',
                            padding: 4,
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
                            stringHelper.capitalizeFirstLetter(preprocName) + ' for svg-sprite is ready'
                        )
                    );

        }

        tars.skipTaskLog('css:make-fallback-for-svg', 'Svg-fallback is not used');
        cb(null);
    });
};
