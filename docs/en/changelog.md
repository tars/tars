<p align="right">
English description | <a href="../ru/changelog.md">Описание на русском</a>
</p>

# Changelog

## Version 1.9.2

* Fix bug with helper Icon in handlebars.

## Version 1.9.1

* Use gulp-pug-inheritance from fork because of errors in original.

## Version 1.9.0

* gulp-minify-html replaced with на gulp-htmlmin.
* Add templater Pug support.
* You can pass any data to templater by using env var TARS_ENV.
* Bugfix.
* English docs fixup and full update. Thanks to [icehaunter](https://github.com/icehaunter).
* Dependencies update.

## Version 1.8.3

* Fix bug with svg2png in 2.0.0 Use 1.0.2

## Version 1.8.2

* Fix watcher for templates with _ in the begining of the name;
* Default scheme for Jade component has been changed. 
* Dependencies update. Eslint has been updated to version 3.x.x.

## Version 1.8.1

* Init process without user-package.json fixed.
* Autoprefixer was added for IE9.
* Pathes for IE entry points were fixed.
* Dependencies update.

## Version 1.8.0

* Modules directory was renamed to components. This is optional, you can change it in [tars-config](options.md#componentsfoldername). 
* Task concat-modules-data was renamed to concat-mocks-data.
* Log fixing for case, when there is problems with sprite generation.
* You can configure gulp-plugins by using [plugins-config.js](plugins-options.md).
* Jade recompilation became faster.
* You can crate components inside another components.
* All images from assets of component will be moved to static/img/assets. Images are files with extensions svg, png, jpg, jpeg, jpe, gif, tiff and bmp.
Other files will be moved to static/components-assets.
* staticPrefix was removed from tars-config.
* Option [generateStaticPath](options.md#generatestaticpath) was added.
* Build name is based on local date.
* TARS works in NodeJs 6.x.x version.

## Version 1.7.1

* Rebuild process of jade-templates became faster.
* Gulp-csso update to version 2.0.0.

## Version 1.7.0

* Plugin gulp-strip-debug has been deleted. uglifyJS will strip all useless code.
* Error log became much more clear.
* You can use notifier.success and notifier.error not in pipe only.
* Tars-config has been updated. All JavaScript-options in [one object now](options.md#js).
* You can [import style-files from node_modules/bower_components by using short syntax](css-processing.md).
* [Webpack](https://webpack.github.io/) has been added. You can use old workflow (concatenation of files) or webpack — this is optional feature, you can manage it [from tars-config](options.md#workflow-1). Alse [Hot Module Replacing](https://webpack.github.io/docs/hot-module-replacement.html) is available. This feature is [managed from tars-config too](options.md#usehmr).
* Tasks main:dev an js:processing have been updated.
* .babelrc update.
* .eslintrc update. New version of eslint is used.
```js
// Updated/added rules:
env: {
    commonjs: true    
},

parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
},

rules: {
    'consistent-return': 0,
    'keyword-spacing': 2,
    strict: 0,
    'no-confusing-arrow': 2,
    'prefer-arrow-callback': 0,
    'no-debugger': 0
}

// Deleted rules:
'no-arrow-condition': undefined,
'space-return-throw-case': undefined,
'space-after-keywords': undefined,
'no-empty-label': undefined,
'no-process-exit': undefined
```
* Documentation update.
* Dependencies update.

## Version 1.6.3

* Bug with images minification has been fixed.
* Taks minify-raster-img has been renamed to minify-images. SVG-images will be minified in that task.
* Docs fixup.

## Version 1.6.2

* Icon helper has been renamed from icon to Icon
* is helper has been updated. != and !== operation has been added.

## Version 1.6.1

* Fix tasks for content images copy process.

## Version 1.6.0

* Sourcemaps are created only in dev-mode.
* Skipped tasks are highlighted in log of gulp.
* There is only one task for css pre- and postporcessing for all preprocessors.
* Stylies for IE9 are compiled in separate task.
* Watchers became much more smarter.
* There is only one task to work with templaters.
* **TARS supports only Node.js 4.x.x and higher**.
* Option for stylies-inject during livereload is [in tars-config now](options.md#injectchanges).
* jscs + jshint has been replaced with eslint.
* **[You can pass data of one module to another by using functions](html-processing.md#working-with-modules-and-data-handlebars). So, it is really easy to init module with any data.**
* Great refactoring. 
    - Add ES6, all tasks refactoring.
    - Build process starts much more fast. All dependencies are required only at that moment then they are really needed.
    - Some methods and helpers have been added:
        + skipTaskLog method — add info about skipped tasks into gulp log;
        + skipTaskWithEmptyPipe helper — it allows you to skip task, if no files were passed through that task;
        + root property — you can get absolute path to tars folder from this property.
        + isDevMode property — it returns !tars.flags.release && !tars.flags.min
    - There are only links to tasks in gulpfile. All main tasks (like build, dev) have been moved from gulpfile to tasks/main and to watchers.
    - Task browsersync has been removed. Browsersync starts in main:dev task.
    - Tasks svg-action and compile-html-with-data-reloading have been moved to watchers.
    - Task minify-html has been renamed to modify-html.
    - Task pre-build has been renamed and moved into namespace main (main:pre-build).
* [You can use css-files, that won't be compiled to one file](css-processing.md).
* All js-code from static folder is in ignore section in babelrc by default. Babel has been updated to version 6.
* Page template and head module update. All useless attributes has been removed. Template looks like page in [html5boilerplate](https://github.com/h5bp/html5-boilerplate).
* You can use %=static=% or \_\_static\_\_ in CSS and HTML instead of %=staticPrefixForCss=% and %=staticPrefix=%. Old prefixes are supported, but it is strongly recommended to use new prefixes.
* staticPrefixForCss property has been removed from tars-config and it is generated in tars/tars.js automatically.
* Normalize has been updated to version 3.0.3
* **[You can use custom Jade and Handlebars helpers](html-processing.md).**
* Helper icon for Jade and Handlebars has been added to TARS. This helper generates template for svg-symbol including.
* You can use [svg-symbols](svg-processing.md#svg-symbols). TARS supports three ways to include svg-symbols. Build for IE8 not supported in that workflow. And there is a polyfill in separate-js for svg-symbols correct loading for IE9 - Edge and all browsers, which don't support with flow.
* useSVG property has been removed from tars-config. You have to configure SVG workflow by [new property in config](options.md#svg). In case of using old config (that has useSVG property), SVG config-object will be generated automatically.
* [Data about all used pages will be add to full-data of your project](html-processing.md#html).
* All sprite will have hash in their names then flag `--release` is used.
* You can set port for Browsersync by using [env var](options.md#open).
* [Default autoprefixer config has been updated](options.md#autoprefixerconfig).
* Path to static folder generates automatically and depends on pages fs.
* All useless tags, labels will be removed from build automatically. For example, if you don't build with `--ie` or `--ie8` flag, html5shiv won't be copied to ready build.
* hml5shiv-print has been removed.
* You can use plane JavaScript-object in data files.
* [You can init your project without templater and preprocessor files mutation](https://github.com/tars/tars-cli/blob/master/docs/en/commands.md#tars-init). It would be useful for forks.
* [You can automatically update your project with TARS-CLI](https://github.com/tars/tars-cli/blob/master/docs/en/commands.md#tars-update-project).
* Task re-init is depricated now. This command will be removed from TARS in new version, cause there is great chance to broke your project.
* Documentation update.

## Version 1.5.0

* Installation in NPM3 has been fixed. If you have a project, which has been made with TARS 1.4.1 and NPM2, and you want to develop this project in NPM3, you have to fix one line in tars/tars.js
```javascript
handlebars: tars.require('gulp-compile-handlebars/node_modules/handlebars'),
// replace with 
handlebars: tars.require('handlebars'),
```
* Handlebars is used from its own package, not from gulp-handlebars.
* You can use css-files in etc folder.

## Version 1.4.1

* Verbose logs on Error in css will be in output.
* Docs about [Babel using](js-processing.md) were updated.
* Html-prettify config was updated.
* Notification will appear on Error even all notifications has been disabled.
* Deps have been updated, bugs have been fixed.

## Version 1.4.0

* Css imports were added. Css (less, scss, sass, styl) files, began with _ will not be compiled, so it is recommended to import only these files. [More info](css-processing.md).
* Added .sass extension supporting.
* Tars-config.js has been updated. [Sourcemaps](options.md#sourcemaps) has more options. Added [Babel supporting switcher](options.md#usebabel).
* Added ES6(ES.Next) syntax supporting with [Babel](options.md#usebabel). [More info](js-processing.md).
* Autoprefixer was moved to the end in the postprocessors list.
* Notifier got one interface for failed and successed end of task. 
* gulp-html-prettify has been added. Formatted HTML will be generated if [minifyHtml](options.md#minifyhtml) is switched to false.
* You need to use flags `--ie9` or `--ie` to compile stylies for IE9. `--ie` will compile stylies for IE8 and IE9 too.
* More helpers were added, docs were updated for helpers and all helpers were moved to task-folder.
* Some bugs have been fixed.

## Version 1.3.1

* Config for PostCSS has been fixed. You do not need to require packages by yourself. You just write them to config and it just works. But don't forget to install all used postprocessors locally via NPM.

## Version 1.3.0

* Sourcemaps for js was added. You can see file name and path to this file from sources in browser .
* [PostCSS](https://github.com/postcss/postcss) has been added. You can [add all postprocessors what you want](options.md#postcss).
* Notification is disabled while build process. You will see it only in that  moment, when you will need it.
* Added .hbs extension support for Handlebars templates.
* Padding between images in raster-sprite has been added.
* Main pages and modules have been refactored.
* Browsersync will open default browser in OS, if there is no any [other instructions in tars-config](options.md#browser).
* New entity tars has been added. This singleton has all methods and properties, which are useful for TARS.
* [TARS-CLI has been created](https://github.com/tars/tars-cli).
* Some bugs have been fixed.

## Version 1.2.7

* Bug with gulp-svg-spritesheet has been fixed.

## Version 1.2.6

* Bug with notify, when it is off has been fixed.

## Version 1.2.4

* Bug with init has been fixed.
* Bug while png-sprite compiling has been fixed.

## Version 1.2.3

* Build process without notifier has been fixed.

## Version 1.2.2

* Assets' files watcher. Subdirectories are unsupported in modules/assets has been fixed.

## Version 1.2.1

* Code-style update. .jscsrc update.
* Path was removed from dependencies list.
* Docs in english were added.

## Version 1.2.0

* The new version of [Browsersync](https://www.browsersync.io/).
* [baseDir](options.md#basedir) option for Browsersync was moved in tars-config.
* Watchers use [chokidar](https://github.com/paulmillr/chokidar) module.
* All watchers were moved in separate files in tars/watchers folder.
* Watchers and tasks are included in gulpfile automatically.
* 'builder-start-screen' task was moved into tars/tasks/services.
* New helpers for handlebars were added (and [documentation for them](handlebars-helpers.md)). All helpers are stored in a separate file tars/helpers/handlebars-helpers.js
* Framework folder was added on the path markup/static/js. This folder is for js-files used by the framework.
* All dependences were updated.
* Including modules syntax in Handlebars was changed. There is the old syntax:
```handlebars
{{> modules/head/head head.defaults}}
```

And there is the new one:
```handlebars
{{> head/head head.defaults}}
```

* There is no more a separate task to compile styles for IE9. Styles for IE9 are compiled as part of compiling styles task for all modern browsers. A separate file is created.
* Workflow for preparing SVG was changed. Base64 encoding was changed with svg-sprite. Mixins for images including were not changed.
* mData/mData.js –> data/data.js

## Version 1.1.1

* A bug of transfer js from separate-js was fixed. It was pointed out the old name of the folder.

## Version 1.1.0

* A user-package.json was added for user dependencies. There are changes in tars/helpers/install-additional-deps.js.
* [Upgrade guide](update-guide.md) TARS was added.
* [Gulp-sass](https://www.npmjs.com/package/gulp-sass) module was updated.
* Generation version of the build was moved to a separate helper for easy customization. It is here: tars/helpers/set-build-version.js
