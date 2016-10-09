<p align="right">
English description | <a href="../ru/tasks.md">Описание на русском</a>
</p>

# Tasks

Each task is a [CommonJS-module](http://wiki.commonjs.org/wiki/Modules/1.1). All tasks are automatically included in gulpfile. You can create your own tasks in the `user-tasks` directory.

By default, only links for main tasks are included in gulpfile.js. For example, `build` is a link to `main:build`. So, you can override any task in TARS quite easily.

You can create your own tasks in `user-tasks` directory. There is an example task included by default. Generally, you could connect any gulp-task to TARS.

By default, each task requires a set of npm-modules and configs to work correctly:

```javascript
const gulp = tars.packages.gulp;
const gutil = tars.packages.gutil;
const notifier = tars.helpers.notifier;
```

Also, if you want to use livereload for this task, you must to connect browserSync module:

```javascript
const browserSync = tars.packages.browserSync;
```

If you require any dependences, include them here. You can add dependencies, which are not in the main `package.json`, you can add to the `user-package.json`, which is at the root of the project. The format is the same as in the main package.json

**Do not put your own dependencies in package.json. Put them into user-package.json** There is only one exception — initialization via TARS-CLI. `user-package.json` won't be created when you init your project via TARS-CLI with common archive with TARS (from current repository). Also, you can [init TARS with TARS-CLI and your own zip archive with TARS](https://github.com/tars/tars-cli#tars-init). If you need to use some additional packages and initialize project via TARS-CLI, you have to add them to user-package.json in your own TARS fork and all additional packages will end up in package.json of new project automatically after `tars init`. This feature is supported from version 1.1.8 of TARS-CLI.

After dependency connection goes the body of a module, which will export the task. Each task is described in an exported function. You have access to global variable `tars` in all tasks and watchers. You can get any info about your current project (config, used prepocessor and so on) from that variable.
Exported function returns the complete gulp-task. After that you can deal with it as with usual task for gulp.

If you need notification, your task must be ended as follows:

```javascript
// If you need to reload browser, uncomment the row below
// .pipe(browserSync.reload({stream:true}))
.pipe(
    notifier('Example task is finished \n')
);
```

The string which is passed to notifier will be displayed in notifications

You can also call the callback, or return the main thread, if you want to perform tasks in a certain order. Read more [here](http://frontender.info/handling-sync-tasks-with-gulp-js).
