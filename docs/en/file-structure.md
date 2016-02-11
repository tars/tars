<p align="right">
English description | <a href="../ru/file-structure.md">Описание на русском</a>
</p>

# File sructure

**All file structure is generated automatically. You do not need to create something by yourself.**

Builder has the following file structure:

```
├── gulpfile.js             # gulpfile of builder
├── tars.json               # System file with info about builder
├── tars-config.js          # Config file
├── package.json            # Basic dependencies
├── .babelrc                # Config for Babel
├── .eslintrc               # Config for eslint
├── user-package.json       # User dependencies
└── tars/                   # Tasks and helpers for gulp
    └── helpers/            # Helpers
    └── tasks/              # Sustem tasks
    └── user-tasks/         # User's tasks
    └── watchers/           # System watchers
    └── user-watchers/      # User's watchers
    └── tars.js             # Main file of the builder
└── markup/                 # The main project folder
    └── modules/            # Modules
    └── pages/              # Page's templates
    └── static/             # Static-files (css, js and so on)
└── docs/                   # Documentation
```


## The structure of the individual module

Module is an independent unit of the page. Example module - «header» or «footer». Each page consists of modules. Any module may include other modules.

```
exampleModule/                              # Module example
    └── assets/                             # Static files for current module (files with any extension) Subdirectories unsupport
    └── ie/                                 # Stylies for IE9.scss|sass|less|styl и IE8.scss|sass|less|styl)
    └── data/                               # Folder for module's data
        ├── data.js                         # Data for module (there is an example for data in _template module)
    ├── exampleModule.html                  # Handlebars-represention of module (it could be jade)
    ├── exampleModule.scss|less|styl        # Css-representation of module (scss|sass|less|styl)
    ├── exampleModule.js                    # Js-represent

```

The basic idea is to make the module as much isolated structure as possible. You can use the [BEM](https://ru.bem.info), [web components](http://webcomponents.org) (and their [realization from Google](https://www.polymer-project.org)), something else. You can do everything by old-fashioned way, all markup is in one module, but it is not recommended.  If we talk in BEM terms, each module is a block. There is an [excellent lecture](https://www.youtube.com/watch?v=pyAYbbDJjPo) on how to organize your code.

Page templates are in `pages` folder. Pages are layouts and should contain as little code as possible. To create a new page just copy the existing (or _template) and rename it or run [tars add-page](https://github.com/tars/tars-cli/blob/master/docs/en/commands.md#tars-add-page-pagename).
Also, you can add module via TARS-CLI — [tars add-module](https://github.com/tars/tars-cli/blob/master/docs/en/commands.md#tars-add-module-modulename).

## Folder static for structure

We assume that Scss was chosen as a css-preprocessor.

```
static/                                     #  Folder for static-files. You can choose the name for that folder in tars-config.js
    └── fonts/                              # Fonts (can contain subdirectories)
    └── img/                                # Images. You can choose the name for that folder in tars-config.js
        └── content/                        # Images for content (can contain subdirectories)
        └── plugins/                        # Images for plugins (can contain subdirectories)
        └── general/                        # General images for project (can contain subdirectories)
        └── sprite/                         # Raster images, which is included in png-sprite.
            └── 96dpi/                      # Images for displays with dpi 96
            ...
            └── 384dpi/                     # Images for displays with dpi 384 (more info in images-processing)
        └── svg/                            # SVG-images
    └── js/                                 # js
        └── framework/                      # js-frameworks (backbone, for example)
        └── libraries/                      # js-libraries (jquery, for-example)
        └── plugins/                        # js-plugins
        └── separate-js/                    # js-files, which must not be included in ready bundle
    └── misc/                               # General files, which will be moved to root directory of ready project — favicons, robots.txt and so on  (can contain subdirectories)
    └── scss                  
        └── etc/                            # Styles, which will be included in the end of ready css-file (can contain subdirectories)
        └── libraries/                      # Styles for libraries (can contain subdirectories)
        └── plugins/                        # Styles for plugins (can contain subdirectories)
        └── sprite-generator-templates/     # Templates for sprite generating
        └── sprites-scss/                   # Mixins for sprites
        ├── separate-css/                   # Css-files, which must not be included in ready bundle
        ├── common.scss                     # General stylies
        ├── fonts.scss                      # Stylies for fons
        ├── GUI.scss                        # Stylies for GUI elements (inputs, buttons and so on)
        ├── mixins.scss                     # Project's mixins
        ├── normalize.scss                  # Stylies reset
        ├── vars.scss                       # Variables
```


## The structure of the ready build

There will be tow folders in the root after assembly of the project: dev and builds. There are description of the dev-version (with --ie8 mode enabled). The finished build is not much different from the dev version.

```
dev/
    └── static/                         # Folder for static-files. You can choose the name for that folder in tars-config.js
        └── css/                        # Ready stylies and stylies for IE9 и IE8, if support is turned on and stylies from separate-css.
        └── img/                        # Images for project
            └── assets/                 # Static files for modules.
                └── exampleModule/      
            └── content/                # Images for content
            └── plugins/                # Images for plugins
            └── svg-sprite/             # SVG-sprite
            └── png-sprite/             # PNG-sprite for different dpi
            └── rastered-svg-images/    # Raster svg-images for IE8
            └── minified-svg/           # Minifies svg-images
        └── js/                         # Ready main.js and separate js-files
            └── separate-js/   
    └── temp/                           # Temp folder for modules' data
    ├── Ready pages and misc-files
```

Build-version of the project does not contain a temp folder, includes minimized css- and js-files. It contains optimized pictures and archive with assembled project (optional).

If the option useBuildVersioning is enabled, each build will be in a separate folder on the path that is specified in the option [buildPath](options.md#buildpath), called build_ver%build_date%. If useBuildVersioning disabled, the finished project will be generated on the path that is specified in the option buildPath, in folder 'build'.

When you need to include an image you have to use the path in which they are existed in the build.

Immediately after initialization or reinitialization in the root folder can be appeared .tmpPreproc and .tmpTemplater folders, which contain a downloaded template and css-preprocessor. At the first build these folders will be deleted. So just do not pay attention to them. These folders are included in .gitignore, so they won't be in your repository.

This file structure can be changed with the appropriate corrections of tasks and watchers. For some folders you do not need to climb in tasks and watchers. For example, it is possible to create a folder for storing js, [which must be included before and after the modules](options.md#jspathstoconcatbeforemodulesjs-и-jspathstoconcataftermodulesjs). This will be useful in case of using different js-frameworks.

Also, do not necessary to use all the folders for images or JavaScript. If something is not necessary, it can be removed.
