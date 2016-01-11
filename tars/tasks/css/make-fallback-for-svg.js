'use strict';

const gulp = tars.packages.gulp;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;
const skipTaskWithEmptyPipe = tars.helpers.skipTaskWithEmptyPipe;

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

        if (tars.config.useSVG && (tars.flags.ie8 || tars.flags.ie)) {
            const spriteData = gulp.src(
                    './dev/' + staticFolderName + '/' + imagesFolderName + '/rastered-svg-images/*.png'
                )
                .pipe(plumber({
                    errorHandler: error => {
                        notifier.error('An error occurred while making fallback for svg.', error);
                    }
                }))
                .pipe(skipTaskWithEmptyPipe('css:make-fallback-for-svg', cb))
                .pipe(
                    tars.require('gulp.spritesmith')(
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
