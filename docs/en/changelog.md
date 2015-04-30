# Changelog

## Version 1.2.3

* Fix build process without notifier

## Version 1.2.2

* Fix assets' files watcher. Subdirectories unsupport in modules/assets
Внесен фикс в вотчер assets-файлов модуля. На данный момент поддиректории в папке assets в модуле не поддерживаются.

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
