'use strict';

const gulp = tars.packages.gulp;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;
const skipTaskWithEmptyPipe = tars.helpers.skipTaskWithEmptyPipe;
const stringHelper = tars.helpers.stringHelper;

const preprocName = tars.cssPreproc.name;
const preprocExtension = tars.cssPreproc.mainExt;
const staticFolderName = tars.config.fs.staticFolderName;
const imagesFolderPath = `${tars.config.devPath}${staticFolderName}/${tars.config.fs.imagesFolderName}`;
const preprocFoldePath = `./markup/${staticFolderName}/${preprocName}`;
const actionsOnSpriteTaskSkipping = require(`${tars.root}/tasks/css/helpers/actions-on-sprite-task-skipping`);


/**
 * Make sprite for svg and styles for this sprite
 * Return pipe with styles for sprite
 */
module.exports = () => {
    return gulp.task('css:make-sprite-for-svg', done => {
        const errorText = 'An error occurred while making sprite for svg.';

        function actionsOnTaskSkipping() {
            return actionsOnSpriteTaskSkipping({
                blankFilePath: `${preprocFoldePath}/sprites-${preprocName}/svg-sprite.${preprocExtension}`,
                fileWithMixinsPath: `${tars.root}/tasks/css/helpers/sprite-mixins/${preprocName}-svg-sprite-mixins.${preprocExtension}`,
                errorText,
                done
            });
        }

        if (tars.config.svg.active && tars.config.svg.workflow === 'sprite') {
            return gulp.src(`${imagesFolderPath}/minified-svg/*.svg`)
                .pipe(plumber({
                    errorHandler(error) {
                        notifier.error(errorText, error);
                    }
                }))
                .pipe(skipTaskWithEmptyPipe('css:make-sprite-for-svg', actionsOnTaskSkipping))
                .pipe(tars.require('gulp-svg-spritesheet')(
                    Object.assign(
                        {},
                        {
                            cssPathSvg: '',
                            templateSrc: `${preprocFoldePath}/sprite-generator-templates/${preprocName}.svg-sprite.mustache`,
                            templateDest: `${preprocFoldePath}/sprites-${preprocName}/svg-sprite.${preprocExtension}`,
                            imgName: `sprite${tars.options.build.hash}.svg`
                        },
                        tars.pluginsConfig['gulp-svg-spritesheet']
                    )
                ))
                .pipe(gulp.dest(`${imagesFolderPath}/svg-sprite/sprite${tars.options.build.hash}.svg`))
                .pipe(notifier.success(`${stringHelper.capitalizeFirstLetter(preprocName)} for svg-sprite is ready.`));
        }

        tars.skipTaskLog('css:make-sprite-for-svg', 'SVG is not used or you prefer symbols workflow');
        actionsOnTaskSkipping();
    });
};
