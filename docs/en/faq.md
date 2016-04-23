<p align="right">
English description | <a href="../ru/faq.md">Описание на русском</a>
</p>

# FAQ

For all questions I am waiting for you in the [gitter](https://gitter.im/tars/tars?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) or by email [tars.builder@gmail.com](mailto:tars.builder@gmail.com).

1. **I have webpack and npm-scripts, so, I do not understand, how TARS with Gulp will be useful for me?**

Every task has its own instrument to resolve it. NPM-scripts are really good for many tasks and you can use only NPM-scripts. But Gulp is not only task-runner actually, it allows you easy transform file from FS to Stream. In case of using NPM-scripts, you have to develop parallel and async tasks processing.
And some words about webpack: it was created to resolve imports/exports/requires in JavaScript. Nowadays it has quite many plugins, but its main task is to compile JavaScript.
And in the end, Gulp + webpack = love, they can (and should) work together.
You can get more info from comments of [docs for webpack with Gulp usage](http://webpack.github.io/docs/usage-with-gulp.html).

2. **Why Gulp, and not Grunt?**
Gulp is a stream builder of JavaScript projects. It uses streams and it is really fast. For example, I have a project where about a thousand stylus files, Grunt needs about 2.5 seconds for assembly and 2 seconds for processing by autoprefixer. Gulp makes all stuff for 0.5 seconds winning Grunt at least 4 times.

3. **How to work with TARS?**
There are several variants.
    * You have one big project with long period of develop/support. TARS will be extremely useful for you. Create components, pages. Store it somewhere in GIT, SVN.
    * You have many projects with general components. So, in taht case you have several options:
        - you can create you own library of components and include in to your own fork of TARS. So you will have all used components after init;
        - you can use git. Every new project is a new branch from master. Inited TARS in master branch;
        - and the last, you can store your own library of used components somewhere.
    * You have many different projects. Just use CVS (GIT, SVN, etc.).

You can choose any option or create your own workflow.

4. **We have our own builder on Gulp/Grunt, but we'd like to work with TARS and use features from our builder.**
You can transfer your tasks to user-tasks in TARS. If you would like to transfer grunt-tasks, you have to rewirte them to Gulp or use [gulp-grunt](https://www.npmjs.com/package/gulp-grunt). 
If you need to Init TARS with all user-tasks by default you should create your own fork of TARS and init TARS with link to your fork. You can get more info from [docs for TARS-CLI](https://github.com/tars/tars-cli/blob/master/docs/en/commands.md#tars-init).

5. **I have OS X (Ubuntu, Linux Mint …). Not all project's files are in the build.**
You have to increase the [ulimit](options.md#ulimit) in tars-config.js

6. **I don't know anything about Gulp. Can I use this builder?**
Knowledge of working with Gulp is not required. At the moment, builder covers most tasks of frontend. All you need to know is described in the documentation.

7. **It seems to me that you are using is too complex file structure. Can I modify it for myself?**
If you know how to work with Gulp, after renaming/deleting/creating folders, you must edit appropriate tasks or [create user-tasks](tasks.md). Some directories are not mandatory and they can be safely removed.
You can also easily expand the file structure for js using the appropriate [options](options.md#jspathstoconcatbeforemodulesjs-%D0%B8-jspathstoconcataftermodulesjs) in the builder config file.
For the main folder with statics and folders whith images you can set the name in respective [options](options.md#fs) in the builder config file.

8. **Everything seems to be installed, but nothing works. What to do? I have a Windows (7, 8, 10)**
Probably not all dependences were installed. Run `npm i` command again. 
If you still have errors, it would be nice if you will send them to ([tars.builder@gmail.com](mailto:tars.builder@gmail.com)) or to [gitter](https://gitter.im/tars/tars?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) chat.
