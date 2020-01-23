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
const actionsOnSpriteTaskSkipping = require(`${tars.root}/tasks/css/helpers/actions-on-sprite-task-skipping`);

/**
 * Make sprite for svg-fallback and styles for this sprite
 * Return pipe with styles for sprite
 */
module.exports = () => {
    return gulp.task('css:make-fallback-for-svg', (done) => {
        const errorText = 'An error occurred while making fallback for svg.';

        function actionsOnTaskSkipping() {
            return actionsOnSpriteTaskSkipping({
                blankFilePath: `./markup/${staticFolderName}/${preprocName}/sprites-${preprocName}/svg-fallback-sprite.${preprocExtension}`,
                fileWithMixinsPath: `${tars.root}/tasks/css/helpers/sprite-mixins/${preprocName}-svg-fallback-sprite-mixins.${preprocExtension}`,
                errorText,
                done,
            });
        }

        if (
            tars.config.svg.active &&
            tars.config.svg.workflow === 'sprite' &&
            (tars.flags.ie8 || tars.flags.ie)
        ) {
            const cssTemplatePath = `./markup/${staticFolderName}/${preprocName}/sprite-generator-templates`;
            const spriteData = gulp
                .src(
                    `${tars.config.devPath}${staticFolderName}/${imagesFolderName}/rastered-svg-images/*.png`,
                )
                .pipe(
                    plumber({
                        errorHandler(error) {
                            notifier.error(errorText, error);
                        },
                    }),
                )
                .pipe(skipTaskWithEmptyPipe('css:make-fallback-for-svg', actionsOnTaskSkipping))
                .pipe(
                    tars.require('gulp.spritesmith')(
                        Object.assign(
                            {},
                            {
                                imgName: `svg-fallback-sprite${tars.options.build.hash}.png`,
                                cssName: `svg-fallback-sprite.${preprocExtension}`,
                                algorithm: 'binary-tree',
                                algorithmOpts: {
                                    sort: false,
                                },
                                padding: 4,
                                cssTemplate: `${cssTemplatePath}/${preprocName}.svg-fallback-sprite.mustache`,
                            },
                            tars.pluginsConfig['gulp.spritesmith']['svg-fallback'],
                        ),
                    ),
                );

            spriteData.img
                .pipe(
                    gulp.dest(
                        `${tars.config.devPath}${staticFolderName}/${imagesFolderName}/rastered-svg-sprite/`,
                    ),
                )
                .pipe(notifier.success('Sprite-img for svg is ready!'));

            spriteData.css
                .pipe(gulp.dest(`./markup/${staticFolderName}/${preprocName}/sprites-${preprocName}/`))
                .pipe(
                    notifier.success(
                        `${stringHelper.capitalizeFirstLetter(preprocName)} for svg-sprite is ready`,
                    ),
                );

            return spriteData;
        }

        tars.skipTaskLog('css:make-fallback-for-svg', 'Svg-fallback is not used');
        actionsOnTaskSkipping();
    });
};
