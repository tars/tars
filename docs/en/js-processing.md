<p align="right">
English description | <a href="../ru/js-processing.md">Описание на русском</a>
</p>

# JS-processing

At the moment assembler works only with the usual js. If you want to use coffeescript or TypeScript or something else, you can fix task 'js-processing' or write me if it does not work. 

ES6(ES.Next) syntax is supported by using [Babel](https://babeljs.io/). Unfortunately, imports are not supported yet, cause there is no any modules to require all dependencies on client. But we are working on it! Use option [useBabel](options.md#usebabel) to turn on the ES6(ES.Next) syntax (it is turned off by default). If you want to exclude some files from Babel processing you can add "babel_ignore_" to the begining of file name or add with file (or directory) to ignore in .babelrc in the root of the project. All js-files from static folder are ignored in babelrs.

All config for Babel is in project root. See the [babel options](https://babeljs.io/docs/usage/options/), except for sourceMap and filename which is handled for you. you can manage with sourcemaps from [builder-config](#sourcemaps).

By default js is in a 2-places:

* in the folder with statics, in a subfolder named js;
* in each separate module.

You can add your own folders for the js, using the appropriate [option](options.md#jspathstoconcatbeforemodulesjs-%D0%B8-jspathstoconcataftermodulesjs) in the TARS config file.
All js-code is collected in a separate file, except js-files, which are located in a separate-js directory. These files are copied as they are in the build. Example of such file is html5shiv.js.

Files are collected in the following order:

* static/js/framework (including subfolders)
* static/js/libraries (including subfolders)
* static/js/plugins (including subfolders)
* all files, which have paths in the jsPathsToConcatBeforeModulesJs option
* js-files from modules
* all files, which have paths in the jsPathsToConcatAfterModulesJs option

Before assembly into one file all js-code (except files from the static/js) is checked for compliance with code-style (which is described in the .jscsrc configuration file in the root of the project) and also is searched for errors. These checks are optional.

Checking files from jsPathsToConcatBeforeModulesJs and jsPathsToConcatAfterModulesJs can be controlled separately by options lintJsCodeBeforeModules and lintJsCodeAfterModules.

If you want to disable checking a file, you need to add to the top of his name '_'.
