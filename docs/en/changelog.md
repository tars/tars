# Changelog

## Version 1.3.1

* Fix config for postcss. You do not need to require packages by yourself. You just write them to config and it just works. But don't forget to install all used postprocessors.

## Version 1.3.0

* Sourcempas for js has been added. So, you can see file name from sources and path to with filename.
* PostCSS has been added. You can add postprocessors, but you can't use PostCSS without pre-processors.
* Notification is disabled while build process. You will see it only in that  moment, when you need it.
* Add .hbs extension support.
* Padding between images in raster-sprite has been added.
* Main pages and modules have been refactored.
* Browser-sync will open default browser in OS, if there is no any other instructions in tars-config.
* New entity has been added.
* TARS-CLI has been created.
* Fixed bugs.

## Version 1.2.7

* Fixed bug with gulp-svg-spritesheet.

## Version 1.2.6

* Fixed bug with notify, when it is off.

## Version 1.2.4

* Fixed bug with init.
* Fixed bug while png-sprite compiling

## Version 1.2.3

* Fix build process without notifier

## Version 1.2.2

* Fix assets' files watcher. Subdirectories unsupport in modules/assets

## Version 1.2.1

* Code-style update. .jscsrc update.
* Remove path from dependencies list.
* Add docs on english.

## Version 1.2.0

* The new version of BrowserSync.
* BaseDir option for browser-sinc was moved in tars-config.
* Watchers use [chokidar](https://github.com/paulmillr/chokidar) module.
* All watchers were moved in separate files in tars/watchers folder.
* Watchers and tasks are included in gulpfile automatically.
* 'builder-start-screen' task was moved in tars/tasks/services.
* New helpers were added in the handlebars (and documentation for them). All helpers are stored in a separate file tars/helpers/handlebars-helpers.js
* Framework folder was added on the way markup/static/js. Folder is for js-files used by the framework.
* Dependences were updated.
* Connecting modules syntax was changed using Handlebars. There is the old syntax:
```handlebars
{{> modules/head/head head.defaults}}
```

There is the new syntax::
```handlebars
{{> head/head head.defaults}}
```

* There is no more a separate task to compile styles for IE9.  Styles for IE9 are compiled as part of compiling styles task  for all modern browsers. A separate file is created.
* Workflow of preparing svg-graphics was changed. Base64 encoding was changed to svg-sprite. Mixins for images including were not chenged.
* mData/mData.js –> data/data.js

## Version 1.1.1

* A bug of transfer js from separate-js was fixed. It was pointed out the old name of the folder.

## Version 1.1.0

* A user-package.json was added for user dependencies. There are changes in tars/helpers/install-additional-deps.js.
* [Upgrade guide](update-guide.md) TARS was added.
* Gulp-sass module was updated.
* Generation version of the build was moved to a separate helper for easy customization. It is here: tars/helpers/set-build-version.js
