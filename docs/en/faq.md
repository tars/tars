# FAQ

For all questions I am waiting for you in the [gitter](https://gitter.im/2gis/tars?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge).

1. **I have OS X (Ubuntu, Linux Mint …).Not all project files are get in the finished build.**
You have to increase the [ulimit](options.md#ulimit) in tars-config.js

2. **I don't know anything about gulp. Can I comfortably use this builder?**
Knowledge of working with gulp not required. At the moment, builder covers most tasks of frontend. All you need to know is described in the documentation.

3. **Why gulp, and not grunt?**
Answer with quote [habrahabr.ru](http://habrahabr.ru/post/208890): 'Gulp.js is a stream builder of JS projects. It uses the Stream and it is really very fast. For example, I have a project where about a thousand stylus files, GruntJS need about 2.5 seconds for assembly and 2 seconds for processing by autoprefixer. Gulp makes all stuff for 0.5 seconds winning GruntJS at least 4 times.

4. **It seems to me that you are using is too complex file structure. Can I modify it for myself?**
If you know how to work with gulp, after renaming/deleting/creating folders, you must edit appropriate tasks. Some directories are not mandatory and they can be safely removed.
You can also easily expand the file structure for js using the appropriate [options](options.md#jspathstoconcatbeforemodulesjs-%D0%B8-jspathstoconcataftermodulesjs) in the builder config file.
For the main folder with statics and folders whith images you can set the name in respective [options](options.md#fs) in the builder config file.

5. **Everything seems to be installed, but nothing works. What to do? I have a Windows (7, 8, 10)**
Probably not all dependences were installed. Run npm i command again. 
If the result of this command is errors, the big wish to send them to me ([artem.malko@gmail.com](mailto:artem.malko@gmail.com)), I will help.
