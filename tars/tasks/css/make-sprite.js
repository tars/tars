'use strict';

const gulp = tars.packages.gulp;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;
const stringHelper = tars.helpers.stringHelper;

const staticFolderName = tars.config.fs.staticFolderName;
const imagesFolderName = tars.config.fs.imagesFolderName;
const usedDpiArray = tars.config.useImagesForDisplayWithDpi;
const preprocExtension = tars.cssPreproc.mainExt;
const preprocName = tars.cssPreproc.name;
const skipTaskWithEmptyPipe = tars.helpers.skipTaskWithEmptyPipe;
const actionsOnSpriteTaskSkipping = require(`${tars.root}/tasks/css/helpers/actions-on-sprite-task-skipping`);

/**
 * Make sprite and styles for this sprite
 */
module.exports = () => {
    return gulp.task('css:make-sprite', (done) => {
        const dpiLength = usedDpiArray.length;
        const cssTemplatePath = `./markup/${staticFolderName}/${preprocName}/sprite-generator-templates`;
        const spritesmithConfig = tars.pluginsConfig['gulp.spritesmith']['regular-raster-sprite'];
        const errorText = 'An error occurred while making png-sprite.';

        let spriteData = [];
        let dpiConfig = {};

        usedDpiArray.forEach((dpiValue) => {
            dpiConfig[`dpi${dpiValue}`] = true;
        });

        function actionsOnTaskSkipping() {
            return actionsOnSpriteTaskSkipping({
                blankFilePath: `./markup/${staticFolderName}/${preprocName}/sprites-${preprocName}/sprite_96.${preprocExtension}`,
                fileWithMixinsPath: `${tars.root}/tasks/css/helpers/sprite-mixins/${preprocName}-raster-sprite-mixins.${preprocExtension}`,
                done,
                errorText,
            });
        }

        /* eslint-disable no-loop-func */

        for (let i = 0; i < dpiLength; i++) {
            spriteData.push(
                gulp
                    .src(
                        `./markup/${staticFolderName}/${imagesFolderName}/sprite/${usedDpiArray[i]}dpi/*.png`,
                    )
                    .pipe(
                        plumber({
                            errorHandler(error) {
                                notifier.error(errorText, error);
                            },
                        }),
                    )
                    .pipe(
                        tars.require('gulp.spritesmith')(
                            Object.assign(
                                {},
                                {
                                    imgName: `sprite${tars.options.build.hash}.png`,
                                    cssName: `sprite_${usedDpiArray[i]}.${preprocExtension}`,
                                    algorithm: 'binary-tree',
                                    algorithmOpts: {
                                        sort: false,
                                    },
                                    cssOpts: dpiConfig,
                                    padding: (i + 1) * 4,
                                    cssTemplate: `${cssTemplatePath}/${preprocName}.sprite.mustache`,
                                },
                                spritesmithConfig,
                                {
                                    padding: (i + 1) * spritesmithConfig.padding,
                                },
                            ),
                        ),
                    ),
            );

            spriteData[i].img
                .pipe(
                    gulp.dest(
                        `${tars.config.devPath}${staticFolderName}/${imagesFolderName}/png-sprite/${usedDpiArray[i]}dpi/`,
                    ),
                )
                .pipe(notifier.success(`Sprite img with dpi = ${usedDpiArray[i]} is ready`));
        }

        /* eslint-enable no-loop-func */

        // Returns css for dpi 96
        return spriteData[0].css
            .pipe(skipTaskWithEmptyPipe('css:make-sprite', actionsOnTaskSkipping))
            .pipe(gulp.dest(`./markup/${staticFolderName}/${preprocName}/sprites-${preprocName}/`))
            .pipe(
                notifier.success(stringHelper.capitalizeFirstLetter(preprocName) + ' for sprites is ready'),
            );
    });
};
