# Options

All builder configuration is in one file — tars-config.js at the root of the project.

You need to restart the assembly to apply changes.

## Variable options

### autoprefixerConfig

Type: `Array or Boolean`

Default: `['> 1%', 'last 2 versions', 'opera 12.1', 'android 4']`

Configuration for autoprefixer (read more [here](http://css-tricks.com/autoprefixer)). In short, this module allows you not to write vendor prefixes.
In this configuration you do not need to include ie8 and ie9, for them style assembly is done by another way.
You can look [here](https://github.com/postcss/autoprefixer#browsers) which browsers are available.
If you do not want to use autoprefixer, pass in this option 'false' value.

### useSVG

Type: `Boolean`

Default: `true`

Enabling svg-image support.

### useJsLintAndHint

Type: `Boolean`

Default: `true`

Enabling error checking in js-code and code-style (option for the code-style are in the root, in .jscsrc file. Full list of available options can be found [here](http://jscs.info/rules.html)).

### jsPathsToConcatBeforeModulesJs и jsPathsToConcatAfterModulesJs

Type: `Array of Strings`

Default: `[]`

By default, all js-code of the project is built in one file except js-files, which are located in a separate-js directory.  If you want to include files into the build from other locations (for example, you create another folder for js-files), you can register in this option path or array of paths (patterns paths, such as 'controllers/\*\*/\*.js') to js-files, which must be connected into the build before js-modules (jsPathsToConcatBeforeModulesJs) and js-files, which must be connected after js modules (jsPathsToConcatAfterModulesJs). 

It will be useful for when building a site on js-framework, with any its entities (controller, router, etc.). You do not need to go into tasks, just create a separate directory and specify for which files you want to watch.

Also you can disable jscs and hinting at these files (lintJsCodeBeforeModules and lintJsCodeAfterModules options).

### notifyConfig

Config for notifications module.

When project files are changed there will be given a system notifications, which will indicate which file is changed and what task is executed.

It has embedded options.

#### useNotify

Type: `Boolean`

Default: `true`

Enabling of notification.

#### title

Type: `String`

Default: `'TARS notification'`

Each notification has a title. If you want to see another title, you can change this option.

#### sounds

Sound notice during the notifications.

##### onSuccess

Type: `String`

Default: `undefined`

In this option the name of the system sound is passed which will be played during the notification. If you don't need the sounds, you can set it by `undefined` value.

### browserSyncConfig

Config for the browser-sync module. This module implements the possibility livereload in browser, sharing the markup to an external web, creating a local server.

#### baseDir

Type: `String`

Default: `'./dev'`

The directory from which the server will take files. The html-file specified in [startUrl](#starturl) should be there.

#### port

Type: `Number`

Default: `3004`

Port on which markup will be available when you turn on local server. If the specified port is in use, it will automatically take next free.

#### open

Type: `Boolean`

Default: `true`

Opening the browser when you turn on livereload or sharing markup to an external Web.

#### browser

Type: `String or Array`

Default: `google chrome`

The name of the browser, which will be opened when you turn on livereload or sharing markup to an external Web. You can also specify an array of values to open several browsers.
Available browsers: safari, internet explorer, google chrome, firefox, opera.

#### startUrl

Type: `String`

Default: `'/index.html'`

In this option a string is requires with the name of the page which you want to start opening the markup in a browser, using livereload or markup sharing to an external Web. The path is specified from dev folder.

#### useNotifyInBrowser

Type: `Boolean`

Default: `true`

By default, the browser displays a notification that the browser has been restarted, js or css has been updated, etc.

### removeConsoleLog

Type: `Boolean`

Default: `true`

Removing console.log and alert from js-files in the build. It's an option, because sometimes it is necessary to retain console.log in the ready build.

### minifyHtml

Type: `Boolean`

Default: `false`

Enabling minifications for html.

### staticPrefix

Type: `String`

Default: `./static/`

It is custom path to the static.
This option is used if the markup is given in the introduction in the backend. This option allows you to set the path to the static's files, if during the implementation path must be different. That the backend developer didn't manually change path in the css- and html- files, you can write the necessary prefix to this option.

Also this option can be usefull if static in your project are taken from a particular location by using nginx or any other web server.

For example, in the markup static is taken from ./public/img/content/img.png, but in the backend it is taken from http://static-server.com. Then, before assembly of the project, staticPrefix must be set to http://static-server.com/. Then all static files will be in following path (for the example images in html) - http://static-server.com/img/content/sample.jpg

The value of this option sets the value of the placeholder %=staticPrefix=%, which can be used in any project files, except style files.

If you do not need this you can set this option is the same as [staticFolderName](#staticfoldername)

### staticPrefixForCss

Type: `String`

Default: `../imageFolderName/`

Custom path to the folder with the statics of the css-files. imageFolderName is taken from the [imagesFolderName](options.md#imagesFolderName) option.

### buildPath

Type: `String`

Default: `'./builds/'`

In this option a string is required with a relative or absolute path to the folder where the project should be built.
If you are using useBuildVersioning (use versioning of builds), each new build will be located in a separate folder with a name - the build version, and each folder will be located at the path specified in buildPath.

### useBuildVersioning

Type: `Boolean`

Default: `true`

Use versioning builds. The name of the version consists of the build name + creation date  (accurate to second).

### useArchiver

Type: `Boolean`

Default: `true`

Creating the archive of the build. The archive is created in the folder with the build.

### ulimit

Type: `Number`

Default: `4096`

By default, the number of simultaneously open files in the operating system is limited. Since the tars working on gulp, then the number of simultaneously open files may be large. To avoid problems with that, you can set ulimit. If the project uses the large number of files and some of them do not fall into the final assembly, then you can just increase this option.

## Partially modifiable options

These options can be changed before the command `re-init` only, because they don't influence to any command, besides `useImagesForDisplayWithDpi`. More info below.

### templater

Type: `String`

Default: `handlebars`

Used template is specified in this option. Jade and handlebars are available. The name of the template is sent in the option with a small letter.

If you want to write in plain html, retain the option unchanged.

### cssPreprocessor

Type: `String`

Default: `scss`

Used css-preprocessor is specified in this option. Scss, less or stylus are available. The name of the css-preprocessor  is sent in the option with a lowercase letters.

### useImagesForDisplayWithDpi

Type: `Array`

Default: `[96]`

The pixel density of different screens, which will be supported by your project. Supported values are:

* 96 - 1 dppx (usuall screen)
* 192 - 2 dppx (retina)
* 288 - 3 dppx (for example, nexus 5)
* 384 - 4 dppx (for example, nexus 6)

On the basis of this option, is created a folder for png-images of different sizes for different screens. Read more in [images processing](images-processing.md) docs.

This option can be changed at any time, but there are a couple of important points. If you change this option before the command `gulp init` or `gulp re-init`, then nothing more not necessary to do. If this option is changed after `gulp init` or `gulp re-init`, it is necessary to create (or delete) directory in the 'static/img/sprite/' folder by hands. The format of the folder name - option value + dpi. For example, 192dpi.

### fs

Options to name the main folders with static. If you change the option from the block before the command `gulp init` or `gulp re-init`, then nothing more not necessary to do. If this option is changed after `gulp init` or `gulp re-init`, it is necessary to rename the appropriate directories by hands.

#### staticFolderName

Type: `String`

Default: `'static'`

The name of the folder where statics of the the project will be. If you are developing a project locally, it is necessary that the value of this option matches with the value of [staticPrefix](#staticprefix) option.

#### imagesFolderName

Type: `String`

Default: `'img'`

The name of the folder where images of the the project will be. Most often  this folder has different names, so the name of this directory is optional.
