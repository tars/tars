'use strict';

const gulp = tars.packages.gulp;
const gutil = tars.packages.gutil;
const del = tars.packages.del;

/**
 * Init builder, apply css-preprocessor and templater
 */
module.exports = () => {
    return gulp.task(
        'service:init',
        gulp.series('service:create-fs', (done) => {
            const ncp = tars.require('ncp');

            const TEMPLATES_PATH = './templates';
            const PAGES_PATH = 'markup/pages';
            const COMPONENTS_PATH = `markup/${tars.config.fs.componentsFolderName}`;

            /**
             * Apply templates files
             * @type  {String} type of template, templater or preprocessor
             * @return {Object} Promise
             */
            function applyTemplates(type) {
                return new Promise((resolveTemplatesApplying, rejectTemplatesApplying) => {
                    if (
                        (type === 'templater' && tars.flags['exclude-html']) ||
                        (type === 'preprocessor' && tars.flags['exclude-css'])
                    ) {
                        return resolveTemplatesApplying();
                    }

                    if (type === 'templater') {
                        const templaterPartsPath = `${TEMPLATES_PATH}/${tars.templater.name}`;
                        Promise.all([
                            new Promise((resolve, reject) => {
                                ncp(`${templaterPartsPath}/${PAGES_PATH}`, `./${PAGES_PATH}`, (error) => {
                                    if (error) {
                                        return reject(error);
                                    }
                                    return resolve();
                                });
                            }),
                            new Promise((resolve, reject) => {
                                ncp(
                                    `${templaterPartsPath}/markup/components`,
                                    `./${COMPONENTS_PATH}`,
                                    (error) => {
                                        if (error) {
                                            return reject(error);
                                        }

                                        return resolve();
                                    },
                                );
                            }),
                        ])
                            .then(() => resolveTemplatesApplying())
                            .catch((error) => rejectTemplatesApplying(error));
                    } else {
                        const preprocPartsPath = `${TEMPLATES_PATH}/${tars.cssPreproc.name}/markup`;
                        Promise.all([
                            new Promise((resolve, reject) => {
                                ncp(
                                    `${preprocPartsPath}/static`,
                                    `./markup/${tars.config.fs.staticFolderName}`,
                                    (error) => {
                                        if (error) {
                                            return reject(error);
                                        }
                                        return resolve();
                                    },
                                );
                            }),
                            new Promise((resolve, reject) => {
                                ncp(`${preprocPartsPath}/components`, `./${COMPONENTS_PATH}`, (error) => {
                                    if (error) {
                                        return reject(error);
                                    }
                                    return resolve();
                                });
                            }),
                        ])
                            .then(() => resolveTemplatesApplying())
                            .catch((error) => rejectTemplatesApplying(error));
                    }
                });
            }

            /**
             * Generate start screen
             * @return {Object} Promise
             */
            function generateStartScreen() {
                return new Promise((resolve) => {
                    if (tars.cli) {
                        tars.say("It's almost ready!");
                    } else {
                        console.log('\n');
                        tars.say('Hi!');
                        tars.say("Let's create awesome markup!");
                    }

                    tars.say(
                        'You can find more info about TARS at ' +
                            gutil.colors.cyan('"https://github.com/tars/tars/blob/master/README.md"'),
                    );

                    if (tars.cli) {
                        tars.say(
                            'Run the command ' +
                                gutil.colors.cyan('"tars --help"') +
                                ' to see all avalible options and commands.',
                        );
                        tars.say('Start your work with ' + gutil.colors.cyan('"tars dev"') + '.');
                    } else {
                        console.log('\n');
                        tars.say(gutil.colors.red.bold("You've started TARS via gulp."));
                        tars.say(gutil.colors.red.bold('This mode is depricated for developing.'));
                        tars.say(gutil.colors.red.bold('Please, do not use "dev" tasks in with mode.\n'));
                        tars.say('Install tars-cli for developing.');
                        tars.say(
                            'Run the command ' +
                                gutil.colors.cyan('"npm i -g tars-cli"') +
                                ', to install tars-cli.',
                        );
                        tars.say('More info: https://github.com/tars/tars-cli.');
                        console.log('\n\n');
                    }

                    resolve();
                });
            }

            /**
             * Remove temp folders
             * @return {Object} Promise
             */
            function removeTemplatesFolders() {
                return new Promise((resolve) => {
                    del(['./templates']).then(() => {
                        resolve();
                    });
                });
            }

            /**
             * Generate last screen after success applying templates
             */
            function finishInit() {
                console.log(
                    gutil.colors.black.bold('\n--------------------------------------------------------'),
                );
                tars.say(gutil.colors.green.bold('TARS has been inited successfully!\n'));
                tars.say('You choose:');
                tars.say(gutil.colors.cyan.bold(tars.cssPreproc.name) + ' as css-preprocessor');
                tars.say(gutil.colors.cyan.bold(tars.templater.name) + ' as templater\n');

                if (tars.flags['exclude-html']) {
                    tars.say('Your templater-files were not changed');
                }

                if (tars.flags['exclude-css']) {
                    tars.say('Your ' + tars.templater.name + '-files were not changed');
                }
                console.log(
                    gutil.colors.black.bold('--------------------------------------------------------\n'),
                );
                done();
            }

            // Start init
            Promise.all([generateStartScreen(), applyTemplates('templater'), applyTemplates('preprocessor')])
                .then(removeTemplatesFolders)
                .then(finishInit)
                .catch((error) => {
                    tars.say(gutil.colors.red(error));
                    tars.say(
                        'Please, repost with message and the stack trace to developer tars.builder@gmail.com',
                    );
                    console.error(error.stack);
                    done();
                });
        }),
    );
};
