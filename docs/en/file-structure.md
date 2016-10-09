<p align="right">
English description | <a href="../ru/file-structure.md">Описание на русском</a>
</p>

# File structure

**File structure is generated automatically. You do not need to create anything yourself.**

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
    └── tasks/              # System tasks
    └── user-tasks/         # User's tasks
    └── watchers/           # System watchers
    └── user-watchers/      # User's watchers
    └── tars.js             # Main file of the builder
└── markup/                 # The main project folder
    └── components/         # Components
    └── pages/              # Page's templates
    └── static/             # Static-files (css, js and so on)
└── docs/                   # Documentation
```


## The structure of the individual component

Component is an independent unit of the page. Example component - "header" or "footer". Each page consists of components. Any component may include other components and can be included into each other.

```
exampleComponent/                           # Component example
    └── assets/                             # Static files for current component (files with any extension) Subdirectories unsupport
    └── ie/                                 # Styles for IE9.scss|sass|less|styl и IE8.scss|sass|less|styl)
    └── data/                               # Folder for component's data
        ├── data.js                         # Data for component (there is an example for data in _template component)
    ├── exampleComponent.html               # Handlebars-represention of component (it could be jade)
    ├── exampleComponent.scss|less|styl     # Css-representation of component (scss|sass|less|styl)
    ├── exampleComponent.js                 # Js-represent
    ├── anotherComponentFolder

```

Any component can be can be embedded into another component.

All images from asstes will be moved to static/img/assets/component_name or static/img/assets/component_name/embedded_component_name, if current component is embedded into another. Images are files with extensions svg, png, jpg, jpeg, jpe, gif, tiff and bmp. Other files will be moved to components-assets (the name of folder is depend on option fs.componentsFolderName).

The basic idea is to make the component as much isolated structure as possible. You can use the [BEM](https://ru.bem.info), [web components](http://webcomponents.org) (and their [realization from Google](https://www.polymer-project.org)), something else. You can do everything by old-fashioned way, all markup is in one component, but it is not recommended.  If we talk in BEM terms, each component is a block. There is an [excellent lecture](https://www.youtube.com/watch?v=pyAYbbDJjPo) on how to organize your code.

Page templates are in `pages` folder. Pages are layouts and should contain as little code as possible. To create a new page just copy the existing one (or _template) and rename it or run [tars add-page](https://github.com/tars/tars-cli/blob/master/docs/en/commands.md#tars-add-page-pagename).
Also, you can add components via TARS-CLI — [tars add-component](https://github.com/tars/tars-cli/blob/master/docs/en/commands.md#tars-add-module-modulename).

## Folder structure for static files

We assume that Scss was chosen as a css-preprocessor.

```
static/                                     # Folder for static-files. You can choose the name for that folder in tars-config.js
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
        ├── entry/                          # Styles for entry points for css in case of manual css-processing More info [here](css-manual-processing.md).                
        └── etc/                            # Styles, which will be included at the end of the ready css-file (can contain subdirectories)
        └── libraries/                      # Styles for libraries (can contain subdirectories)
        └── plugins/                        # Styles for plugins (can contain subdirectories)
        └── sprite-generator-templates/     # Templates for sprite generating
        └── sprites-scss/                   # Mixins for sprites
        ├── separate-css/                   # Css-files, which must not be included in ready bundle
        ├── common.scss                     # General styles
        ├── fonts.scss                      # Styles for fonts
        ├── GUI.scss                        # Styles for GUI elements (inputs, buttons and so on)
        ├── mixins.scss                     # Project's mixins
        ├── normalize.scss                  # Styles reset
        ├── vars.scss                       # Variables
```


## The structure of the complete build

There will be two folders in the root after assembly of the project: dev and builds. Below is the description of the dev version (with --ie8 mode enabled). The finished build is not much different from the dev version.

```
dev/
    └── static/                         # Folder for static-files. You can choose the name for that folder in tars-config.js
        └── css/                        # Ready styles and styles for IE9 and 
        IE8, if support is turned on and styles from separate-css.
        └── components-assets/          # Static files for components.
                └── exampleComponent/   
        └── img/                        # Images for project
            └── assets/                 # Static files for components. Only images
                └── exampleComponent/      
            └── content/                # Images for content
            └── plugins/                # Images for plugins
            └── svg-sprite/             # SVG-sprite
            └── png-sprite/             # PNG-sprite for different dpi
            └── rastered-svg-images/    # Raster svg-images for IE8
            └── minified-svg/           # Minifies svg-images
        └── js/                         # Ready main.js and separate js-files
            └── separate-js/   
    └── temp/                           # Temp folder for components' data
    ├── Ready pages and misc-files
```

Build version of the project does not contain a temp folder, includes minified css and js files. It contains optimized pictures and an archive with the assembled project (optional).

If the option useBuildVersioning is enabled, each build will be in a separate folder on the path that is specified in the option [buildPath](options.md#buildpath), called build_ver%build_date%. If useBuildVersioning disabled, the finished project will be generated on the path that is specified in the option buildPath, in folder 'build'.

When you need to include an image you have to use the path in which they exist in the build.

Immediately after initialization or reinitialization, `.tmpPreproc` and `.tmpTemplater` folders can appear in the root folder, which contain a downloaded template and css-preprocessor. After the first build these folders will be deleted. So just ignore them. These folders are included in .gitignore, so they won't be in your repository.

This file structure can be changed with the appropriate corrections of tasks and watchers. For some folders you do not need to dig through tasks and watchers: for example, it is possible to create a folder for storing js, [which must be included before and after the components](options.md#jspathstoconcatbeforemodulesjs-и-jspathstoconcataftermodulesjs). This will be useful in case of using different js-frameworks.

Also, it is not necessary to use all the folders for images or JavaScript. If something is not necessary, it can be removed.
