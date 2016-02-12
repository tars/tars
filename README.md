<p align="right">
English description | <a href="README_RU.md">Описание на русском</a>
</p>

# ![Tars](https://raw.githubusercontent.com/artem-malko/artwork/master/tars/logo.png)

[![Mac/Linux Build Status](https://img.shields.io/travis/tars/tars/master.svg?label=Mac%20OSX%20%26%20Linux&style=flat-square)](https://travis-ci.org/tars/tars) [![Windows Build status](https://img.shields.io/appveyor/ci/artem-malko/tars/master.svg?label=Windows&style=flat-square)](https://ci.appveyor.com/project/artem-malko/tars/branch/master) [![Gitter](https://img.shields.io/badge/gitter-join%20chat%20%E2%86%92-brightgreen.svg?style=flat-square)](https://gitter.im/tars/tars?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

TARS is a markup builder, which is based on [Gulp.js](http://gulpjs.com/). It facilitates and accelerates process of html-markup of any complexity.
TARS will be suitable for teams and individual developer. It solves the most routine cases associated with a markup and it brings you more pleasure from work.

TARS is the framework for gulp, including a set of gulp-tasks and it allows the ability to easily expand (creating new tasks) and modification of existing tasks,  provides comfortable architecture for storage tasks and watchers in the project. 

There is [TARS-CLI](https://github.com/tars/tars-cli) in order to not install all dependencies all the time, when you are installing TARS. So, TARS is not a npm-package by itself. This decision was decided so that everyone can customize the builder as comfortable as possible for themselves. CLI — just simple interface for builder, which includes all dependencies for TARS.

**It is strongly recommended to use TARS-CLI for developing from with moment.**

You can install TARS-CLI via NPM. More info in [project's repository](https://github.com/tars/tars-cli).


## Basic features

Listed below are just a little part of the features. In fact builder has much more.

* [Jade](http://jade-lang.com/) or [Handlebars](http://handlebarsjs.com/) as html-templater. You can also use a regular html. Read more [in docs](/docs/en/html-processing.md).
* Using json (js-object actually, which can be described in json) to transfer data in templates (optional, but it is  very cool thing that will let you to rid of copypast). Read more [in docs](/docs/en/html-processing.md#%D0%A0%D0%B0%D0%B1%D0%BE%D1%82%D0%B0-%D1%81-%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D1%8F%D0%BC%D0%B8-%D0%B8-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D0%BC%D0%B8-%D0%B2-handlebars).
* You can use ES6 (and some experimental features from ES7) right now. [More info](/docs/en/js-processing.md).
* [SCSS (SASS)](http://sass-lang.com/), [LESS](http://www.lesscss.ru/) or [Stylus](http://learnboost.github.io/stylus/) as a preprocessor for css. Also it includes a small set of mixins. Sourcemaps is included. You can use .scss and .sass extension then scss is selected as preprocessor. You can use .scss and .sass files together. Read more [in docs](/docs/en/css-processing.md). [PostCSS](https://github.com/postcss/postcss) with [autoprefixer](https://github.com/postcss/autoprefixer) is supported by default and it is really easy [to use additional plugins for PostCSS](/docs/en/options.md#postcss).
* No external libraries and plugins (except [html5shiv](https://ru.wikipedia.org/wiki/Html5_Shiv)). Yes, this is a feature because you can choose library for using. Sourcemaps for JavaScript is included.
* [Chokidar](https://github.com/paulmillr/chokidar) module is used for watching files
* Sharing of markup from your local computer to an external web, optional. And of course it has a livereload in browser (and not just locally) + GUI to control panel for devices, on which markup was shearing.
* [You can easily add new tasks and watchers](/docs/en/tasks-and-watchers.md). There are several examples of how to create and use a new task or watcher inside the TARS. Thereby, it is really easy to add any task from your builder to TARS or integrate TARS into your project.
* Smart work with images. First of all with vector(svg). There will be no more hell with markup for screens with high pixel density. TARS supports two workflows of working with SVG: [SVG-sprites](docs/en/svg-processing.md#svg-sprites) and [SVG-symbols](docs/en/svg-processing.md#svg-symbols).
* Several modes of assembly (common, with minified files, with hash in the title of css- and js-files for deploy).
* Creating archive with the ready build.

## Documentation

It is important! All examples in documentation use the default settings.

* [File structure](/docs/en/file-structure.md)
* [Working with tasks and watchers](/docs/en/tasks-and-watchers.md)
* [Options](/docs/en/options.md)
* [Html](/docs/en/html-processing.md)
* [Css](/docs/en/css-processing.md)
* [Js](/docs/en/js-processing.md)
* [Working with images](/docs/en/images-processing.md)
* [Working with fonts and misc-files](/docs/en/fonts-and-misc.md)
* [Usage script (scenarios)](/docs/en/scenarios.md)
* [Upgrade guide](/docs/en/update-guide.md)
* [FAQ](/docs/en/faq.md)


## Installation

**Attention, [TARS-CLI](https://github.com/tars/tars-cli) is the preferably
 way to work with TARS. It is more comfortable, fast to work with TARS-CLI. In case of using TARS with TARS-CLI all installation steps are not necessary!**

You need to [install `Node.js`](http://nodejs.org/) with version equal to 4.x.x or higher. If you use Node.js version 5.x.x, please, be sure, that you use npm version 3.x.x and higher. Otherwise update npm by using command:

```bash
npm i -g npm
```

For Windows you have to do some more steps:

* navigate to C:\Program Files (x86)\nodejs or C:\Program Files\nodejs via cmd.exe or any available terminal. The path depends on how Node.js was installed;
* run command `npm install npm@latest`.

If you get a **Permission denied** or **Error: EACCES** error, you should run the previous command again in sudo.

Next you need to install gulp globally. (You may need rights of superuser or administrator).

```shell
npm install -g gulp
```

[Download TARS](../../../tars/archive/master.zip) and unzip it in the working directory. Then install dependencies. Command is run from a folder with TARS files (usually it is a tars-master).

```shell
npm install
```

If not all of the dependencies have been installed, the last operation must be repeated. 

After installing of all dependencies you need to open tars-config (detailed description of the options are [here](/docs/en/options.md)) and set up the project for yourself. In that config file, you can select the templater, css-preprocessor, using the notifications, folder names for different static and etc. After setting up the project, execute the following command:

```shell
gulp init
```

**Attention, [TARS-CLI](https://github.com/tars/tars-cli) is the preferably 
way to work with TARS. [Init command is available in TARS-CLI too](https://github.com/tars/tars-cli/blob/master/docs/en/commands.md#tars-init).**

This command will create the basic file structure, download tasks for selected templater and css-preprocessor. 
Everything is ready, make it work! :)


## Basic commands

**Attention, [TARS-CLI](https://github.com/tars/tars-cli) is the preferably
 way to work with TARS. It is more comfortable, fast to work with TARS-CLI. All commands are available and [described in TARS-CLI](https://github.com/tars/tars-cli/blob/master/docs/en/commands.md), so use only TARS-CLI for working with your project. TARS used Gulp to start tasks, when CLI was not created.**

`gulp init` — initializes project with the specified settings in the tars-config. Creates a file structure.

`gulp re-init` — **This command is depricated!** reinitialize the project with specified settings in the tars-config. It is proposed to use this command if you initialize the project with incorrect options. **Attention, files from pages and static folder will be deleted.**

`gulp` or `gulp build` — make project assembly. There not minimized files are connected. Type of assembly depends on the transmitted keys with this command. Available keys:

* `--min` – minimized files connected to html.
* `--release` – minimized  files connected to html whose names have hash. This mode is useful if you are directly trying to deploy ready markup to the server.

`gulp dev` — initialization of builder in development mode. Dev-version of the project is created  without any minifications. Also it launches watchers for project files. Available keys:

* `--lr` – initialization livereload (live page reloads with changes in project files), if it is included in the configuration of the project.
* `--tunnel` – initialization project with sharing markup to an external web.

The link will be shown in the console. There also will be a link to control panel for devices on which markup was sharing.

`gulp build-dev` — generation of dev-version of the project without watchers.

Keys are available in any mode of assembly:

* `--ie8` – to include in the build styles for ie8.
* `--ie9` – to include in the build styles for ie9.
* `--ie` – to include in the build styles for ie8 and ie9.


## Documentation

It is important! All examples in documentation use the default settings.

* [File structure](/docs/en/file-structure.md)
* [Working with tasks and watchers](/docs/en/tasks-and-watchers.md)
* [Options](/docs/en/options.md)
* [Html](/docs/en/html-processing.md)
* [Css](/docs/en/css-processing.md)
* [Js](/docs/en/js-processing.md)
* [Working with images](/docs/en/images-processing.md)
* [Working with fonts and misc-files](/docs/en/fonts-and-misc.md)
* [Usage script (scenarios)](/docs/en/scenarios.md)
* [Upgrade guide](/docs/en/update-guide.md)
* [FAQ](/docs/en/faq.md)


## Last changes

All recent changes are available at the link: [changelog](/docs/en/changelog.md).

If you have a question you can write in [gitter](https://gitter.im/tars/tars?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) or mail [tars.builder@gmail.com](mailto:tars.builder@gmail.com)

Bugs and feature-request here: [issues](https://github.com/tars/tars/issues/new).
