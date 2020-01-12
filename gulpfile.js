'use strict';

// Tars main-module init
// It is a global var
require('./tars/tars');

const gulp = tars.packages.gulp;

// Require system and user's tasks
// You can add your own tasks.
// All your tasks have to be in tars/user-tasks folder
tars.helpers.tarsFsHelper.getTasks().forEach((file) => require(file)());

// Register links to main tasks without namespace
// Build-dev task. Build dev-version (without watchers)
gulp.task(
    'build-dev',
    gulp.series('main:build-dev', (done) => done()),
);

// Dev task. Build dev-version with watchers and livereload
gulp.task(
    'dev',
    gulp.series('main:dev', (done) => done()),
);

// Build task. Build release version
gulp.task(
    'build',
    gulp.series('main:build', (done) => done()),
);

// Init task. Just start init task
gulp.task(
    'init',
    gulp.series('service:init', (done) => done()),
);

// Update-deps task. Just start update-deps task
gulp.task(
    'update-deps',
    gulp.series('service:update-deps', (done) => done()),
);

// Default task. Just start build task
gulp.task(
    'default',
    gulp.series('build', (done) => done()),
);
