<p align="right">
English description | <a href="../ru/tasks-and-watchers.md">Описание на русском</a>
</p>

# Tasks and watchers

TARS is a set of gulp-tasks organized in a special way. Each task is a separate file (except a components files, such as build, dev, etc.), where you can describe transformations of set of files. Also, where are watchers in TARS, which allow you to start tasks after any file of your project was changed. Tasks and watchers can be system (build in TARS by default) and user's. You can use it to add more features to TARS.

In general, TARS works in developer-mode as follows:

* all tasks, which is used to build your project are started;
* after build-proccess all watchers will be started. They will watch for files in your project and start tasks after file-change.

All built-in tasks are in the `tars/tasks` directory. They are divided into folders according to the task type. built-in watchers are in the `tars/watchers` directory. You can add your own tasks and watchers in `tars/user-tasks`/`tars/user-watchers`.

When you add tasks or watchers it is recommended to use:
* tars.config.fs.staticFolderName - for the name of the folder with statics;
* tars.config.fs.imagesFolderName - for the name of the folder with images; 
* tars.templater.ext - contains an extensions for files of the selected templater;
* tars.cssPreproc.ext - contains an extensions for files of the selected css-preprocessor.

If you need to replace built-in task/watcher, you have to call you own task/watcher like built-in and do not forget to repeat file structure. There is small example, which is true for tasks and watchers, let's imagen, that there is built-in task `minify-html.js`:

```
tars/tasks/html/minify-html.js
```

And you need to use your own `minify-html.js`. So, you have to create folder `html` inside `user-tasks` and create file `minify-html.js` there (repeat file structure of built-in task and use the same name of a task):

```
tars/user-tasks/html/minify-html.js
```

In that case only user's task will be included in gulpfile.js

If you need to use your own task in exist task-chain, for example in dev-task, you have to override main:dev task by your custom version of it with chain, that will useful for you.

Also, you can switch-off any task/watcher by adding `_` sign in the begginng of the name of that task/watcher.

You can get more info in docs for [tasks](tasks.md) and [watchers](watchers.md).
