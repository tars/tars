'use strict';

const gulp = tars.packages.gulp;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;
const skipTaskWithEmptyPipe = tars.helpers.skipTaskWithEmptyPipe;

const preprocName = tars.cssPreproc.name;
const preprocExtension = tars.cssPreproc.mainExt;
const imagesFolderPath = './dev/' + tars.config.fs.staticFolderName + '/' + tars.config.fs.imagesFolderName;
const preprocFoldePath = './markup/' + tars.config.fs.staticFolderName + '/' + preprocName;


/**
 * Make sprite for svg and styles for this sprite
 * Return pipe with styles for sprite
 */
module.exports = () => {
    return gulp.task('css:make-sprite-for-svg', cb => {

        if (tars.config.useSVG) {
            return gulp.src(imagesFolderPath + '/minified-svg/*.svg')
                .pipe(plumber({
                    errorHandler: error => {
                        notifier.error('An error occurred while making sprite for svg.', error);
                    }
                }))
                .pipe(skipTaskWithEmptyPipe('css:make-sprite-for-svg', cb))
                .pipe(tars.require('gulp-svg-spritesheet')({
                    cssPathSvg: '',
                    templateSrc: preprocFoldePath + '/sprite-generator-templates/'
                                    + preprocName + '.svg-sprite.mustache',
                    templateDest: preprocFoldePath + '/sprites-' + preprocName
                                    + '/svg-sprite.' + preprocExtension
                }))
                .pipe(gulp.dest(imagesFolderPath + '/svg-sprite/sprite.svg'))
                .pipe(
                    notifier.success(
                        preprocName.charAt(0).toUpperCase() + preprocName.slice(1) + ' for svg-sprite is ready.'
                    )
                );
        } else {
            tars.skipTaskLog('css:make-sprite-for-svg', 'SVG is not used');
            cb(null);
        }
    });
};
