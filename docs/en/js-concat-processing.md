<p align="right">
English description | <a href="../ru/js-concat-processing.md">Описание на русском</a>
</p>

# JS-processing with simple concat

You should use this workflow in case if you do not have large project or you do not need to resolve dependencies between files. All JavaScript-files will be concatinated into one bundle in specific order.

By default JavaScript-fiels are in a 2-places:

* in the folder with statics, in a subfolder named js;
* in each separate module.

You can add your own folders for the JavaScript, using the appropriate [option](options.md#jspathstoconcatbeforemodulesjs-%D0%B8-jspathstoconcataftermodulesjs) in the TARS config file.
All JavaScript-code is collected in a separate file, except JavaScript-files, which are located in a separate-js directory. These files are copied as they are in the build. Example of such file is html5shiv.js.

Files are collected in the following order:

* static/js/framework (including subfolders)
* static/js/libraries (including subfolders)
* static/js/plugins (including subfolders)
* all files, which have paths in the jsPathsToConcatBeforeModulesJs option
* JavaScript-files from modules
* all files, which have paths in the jsPathsToConcatAfterModulesJs option

**All files with _ in the begining of the file name won't be added to bundle and won't be linted by eslint.**

Checking files from jsPathsToConcatBeforeModulesJs and jsPathsToConcatAfterModulesJs can be controlled separately by options lintJsCodeBeforeModules and lintJsCodeAfterModules.
