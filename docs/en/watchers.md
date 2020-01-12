<p align="right">
English description | <a href="../ru/watchers.md">Описание на русском</a>
</p>

# Watchers

As tasks, watchers is a [CommonJS-module](http://wiki.commonjs.org/wiki/Modules/1.1). All watchers are automatically included in a gulpfile.

You could create your own watcher in a `user-watchers` directory. By default, there is already an example of a watcher. Let's take a closer look.

By default, each watcher requires a set of npm-modules and configs to work correctly:

```javascript
const gulp = tars.packages.gulp;
const runSequence = tars.packages.runSequence.use(gulp);
const gutil = tars.packages.gutil;
const chokidar = tars.packages.chokidar;
const watcherLog = tars.helpers.watcherLog;
```

```javascript
    return chokidar.watch(
        /* String of path pattern or array of strings */,
        Object.assign(tars.options.watch, {
            // Options set bellow will override default from tars.options.watch
            // If you need default options, you can use just tars.options.watch
            ignored: /* String of path pattern or array of strings to ignore. If nothing to igonre — just set it to ''*/,
            persistent: /* Boolean, true by default*/,
            ignoreInitial: /* Boolean, true by default*/
        })
    ).on('all', function(event, path) {
        watcherLog(event, path);
        // You could start as many tasks as you need
        runSequence(/* Task name (String) to start */);
    });
```

You can pass a pattern or pattern arrays of path to files for which you need to watch into `chokidar.watch`.

You can pass options for `chokidar` after patterns. If default options are ok for you, you can pass just `tars.options.watch` as the second argument of `chokidar.watch`. If you need to override some options, you have to use [`Object.assign`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).

You can pass a pattern or an array of patterns of paths to files that you want to filter from watching within current watcher into the option `ignored`.

Task name is passed to `gulp.start`, which should be run on any changes in watched files. By default watchers work for all file operations (delete, create, rename). You can change this behavior by changing the `.on('all', function(event, path)` to the needed event. List of available events is in [chokidar docs](https://github.com/paulmillr/chokidar#getting-started).
