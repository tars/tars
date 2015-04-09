# Tasks and watchers

TARS is a set of gulp-tasks organized in a special way. Each task is a separate file (except a components files, such as build, dev, etc.). All system tasks are in the `tars/tasks`, them are divided into folders according to the type task.

All watchers for tasks are in the `tars/watchers`.

## Tasks

Each task is a [commonJS-module](http://wiki.commonjs.org/wiki/Modules/1.1). All tasks are automatically included in gulpfile in the project root.
Yours tasks you can create in the user-tasks directory. 
By default, there is already an example of task. Let us examine it in detail. Let's take a closer look. 

By default, each task requires a set of npm-modules and configs to work correctly:

```javascript
var gulp = require('gulp');
var notify = require('gulp-notify');
var notifier = require('../helpers/notifier');
var tarsConfig = require('../../tars-config');
```

Also, if you want to use livereload for this task, you must to connect browser-sync module:

```javascript
var browserSync = require('browser-sync');
```

Если требуются какие-либо еще зависимости, подключаем их тут же. При этом, зависимости, которых нет в основном package.json, можно занести в user-package.json, который находится в корне проекта. Формат такой же, как и у основного package.json Это сделано для того, чтобы при обновлении зависимостей tars командой `gulp update-deps` ваши зависимости не перетирались.

If you require any dependences, include them there. Dependencies, which are not in the main package.json, you can add to the `user-package.json`, which is at the root of the project. The format is the same as in the main package.json. This is very useful, when you upgrade tars dependencies by command `gulp update-deps`. Your dependencies in `user-package.json` will be not overwritten.

!Do not put your own dependencies in package.json. Put them into user-package.json!

So, if there are dependencies from another tasks, require them to the current:

```javascript
require('./ path to task file from current task');
```

Then there is module body, which will export a task. Each task is described in the exported function which receives as a parameter builder configuration (buildOptions). Hash is in the build config (if the build key is `--release`), also there is a current build version, if you use versioning. Exported function returns the complete gulp-task. Next do everything as with usual task for gulp.

If you need notification, a task must be ended as follows:

```javascript
// If you need to reload browser, uncomment the row below
// .pipe(browserSync.reload({stream:true}))
.pipe(
    notifier('Example task is finished \n')
);
```

String is sent in the notifier which will be displayed in the notification. 

You can also call the callback, or return the main thread, if you want to perform tasks in a certain order. Read more [here](http://frontender.info/handling-sync-tasks-with-gulp-js).

Generally, in TARS you can include any gulp-task.

## Watchers

As tasks, watchers is a [commonJS-модуль](http://wiki.commonjs.org/wiki/Modules/1.1). All watchers is automatically included in a gulpfile in the root of the project.

You could crate your own watcher in a user-watchers directory. By default, there is already an example of watcher. Let's take a closer look.

By default, each watcher requires a set of npm-modules and configs to work correctly:

```javascript
var gulp = require('gulp');
var gutil = require('gulp-util');
var chokidar = require('chokidar');
var tarsConfig = require('../../tars-config');
var watcherLog = require('../helpers/watcher-log');
```

```javascript
    return chokidar.watch(/* String of path pattern or array of strings */, {
        ignored: /* String of path pattern or array of strings to ignore. If nothing to igonre — just set it to ''*/,
        persistent: true,
        ignoreInitial: true
    }).on('all', function(event, path) {
        watcherLog(event, path);
        // You could start many tasks
        gulp.start(/* Task name (String) to start */);
    });
```

You can pass a pattern or pattern arrays of path to files for which you need to watch into `chokidar.watch`.

You can pass a pattern or pattern arrays of path to files that you want to filter from watching within this watcher into option `ignored`.

In gulp.start task name is passed to be started when following by watchers files were changed. By default watchers work for all file operations (delete, create, rename). You can change this behavior by changing the .on('all', function(event, path) to the needed event. List of available events is in [chokidar docs](https://github.com/paulmillr/chokidar#getting-started).

When you add watchers it is recommended to use variables:

tarsConfig.fs.staticFolderName - for the name of the folder with statics
tarsConfig.fs.imagesFolderName - for the name of the folder with images
watchOptions.templateExtension - contains an extension for files of the selected template
watchOptions.cssPreprocExtension - contains an extension for files of the selected css-preprocessor
