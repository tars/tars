# Watchers

As tasks, watchers is a [commonJS-модуль](http://wiki.commonjs.org/wiki/Modules/1.1). All watchers is automatically included in a gulpfile in the root of the project.

You could crate your own watcher in a user-watchers directory. By default, there is already an example of watcher. Let's take a closer look.

By default, each watcher requires a set of npm-modules and configs to work correctly:

```javascript
const gulp = tars.packages.gulp;
const gutil = tars.packages.gutil;
const chokidar = tars.packages.chokidar;
const watcherLog = tars.helpers.watcherLog;
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
