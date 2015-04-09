# JS-processing

At the moment assembler works only with the usual js. If you want to use coffeescript or TypeScript or something else, you can fix task 'js-processing' or write me if it does not work. In future it is planned to make it optional + add using the syntax ES6.

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

Перед сборкой в один файл весь js-код (кроме файлов из static/js) проверяется на соответствие code-style (который описан в конфигурационном файле .jscsrc в коре проекта), а также производится поиск ошибок. Данный проверки [опциональны](options.md#usejslintandhint).

Before assembly in one file all js-code (except files from the static/js) is checked for compliance with code-style (which is described in the .jscsrc configuration file in the root of the project) and also is searched for errors. These checks are optional.

Checking files from jsPathsToConcatBeforeModulesJs and jsPathsToConcatAfterModulesJs can be controlled separately by options lintJsCodeBeforeModules and lintJsCodeAfterModules.

If you want to disable checking a file, you need to add to the top of his name '_'.
