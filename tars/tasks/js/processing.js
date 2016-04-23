'use strict';

const gulp = tars.packages.gulp;
const runSequence = tars.packages.runSequence.use(gulp);

module.exports = () => {
    return gulp.task('js:processing', ['js:check'], done => {
        switch (tars.config.js.workflow) {
            case 'modular':
                // It is not necessary to start webpack with HMR with live reload
                // cause Browser-sync has middleware with webpack.
                if (tars.config.js.webpack.useHMR && tars.useLiveReload) {
                    done();
                } else {
                    runSequence(
                        `js:${tars.config.js.bundler}-processing`,
                        done
                    );
                }
                break;
            case 'concat':
            default:
                runSequence(
                    'js:concat-processing',
                    done
                );
                break;
        }
    });
};
