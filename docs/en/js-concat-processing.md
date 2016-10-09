<p align="right">
English description | <a href="../ru/js-concat-processing.md">Описание на русском</a>
</p>

# JS-processing with simple concatenation

You should use this workflow in case if you don't have large project or you don't need to resolve dependencies between files. All JavaScript files will be concatenated into one file in a specific order.

By default JavaScript files are located in 2 places:

* in the static folder, in a subfolder named `js`;
* in each separate component.

You can add your own folders for JavaScript, using the appropriate [option](options.md#jspathstoconcatbeforemodulesjs-and-jspathstoconcataftermodulesjs) in the TARS config file.
All JavaScript-code is collected in a separate file, except for JavaScript files, which are located in a `separate-js` directory. These files are copied as-is in the build. Example of such file is `html5shiv.js`.

Files are collected in the following order:

* `static/js/framework` (including subfolders)
* `static/js/libraries` (including subfolders)
* `static/js/plugins` (including subfolders)
* all files, which have paths in the `jsPathsToConcatBeforeModulesJs` option
* JavaScript-files from components
* all files, which have paths in the `jsPathsToConcatAfterModulesJs` option

**All files with `_` in the begining of the file name won't be added to bundle and won't be linted by eslint.**

Checking files from `jsPathsToConcatBeforeModulesJs` and `jsPathsToConcatAfterModulesJs` can be controlled separately by [appropriate options](options.md#jspathstoconcatbeforemodulesjs-and-jspathstoconcataftermodulesjs).
