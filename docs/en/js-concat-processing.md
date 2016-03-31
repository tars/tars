<p align="right">
English description | <a href="../ru/js-concat-processing.md">Описание на русском</a>
</p>

# JS-processing with simple concat

You should use this workflow in case if you do not have large project or you do not need to resolve dependencies between files.

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
