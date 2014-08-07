markupBuilder
=============

Markup builder on gulp
It uses Jade as templater, scss as preprocessor for css, lint for js files, font-generator and many other things.

You have to install `nodeJS` version >= 0.8 and `npm` for using markupBuilder.
Also you need Java for webfont generator. If you are not going to generate fonts, you don't need it.

Installation
------------

    npm i or npm install

Install gulp, webfonts, browser-sync globaly and all dependencies.  

    gulp init

Create fonts, images (with subdirs), js/libs and js/plugins directories and so on.

If you use Linux: Notify-send should be installed (On Ubuntu this is installed per default).
If you use Windows: Growl for Windows (http://www.growlforwindows.com/gfw/default.aspx) should be installed. Don't forget to run Growl before using markupBuilder

!Don't forget to check projectConfig in root directory!

Descritpion
-----------

`Markup` is the main folder of project. There are `modules`, `static` folder for static-files and templates of `pages`. 
Even module is a part of page, for example — «header».
Even module has it's own temaplte, scss-files, js-files and images. Also it could has `ie` folder for scss files for ie9 and ie8 (For example: ie8.scss, ie9.scss).
There are templates of pages in `pages` directory of markup. To create new page just create new file with the name of the page or dublicate _template.jade file.

Modules have to be included into the pages templates. Also modules could include other modules.

You shouldn't use prefixes in css, autoprefixer do it itself. JSHint and lint will check yor js-code for errors and code style. You could configure jsLint config (.jscs.json file in the root directory).

Main commands
-------------

`gulp clean` — clean dev directory.

`gulp dev` — development task. Create compiled dev-version of project and watch for changes in project's files. Call clean task in the begining.

`gulp build-dev` — just generate dev version of project, without watchers.

`gulp build` — create build version of project.

If you need to generate woff, eot and svg files of your font, you can use key `--gf`. 
Example: `gulp build --gf`. This command build project and generate fonts files into fonts folder in build. All you need is ttf-file of your font in folder fonts in static directory.
Unfortunately, you can't generate fonts, if you use Windows. That'll be repeared it soon.

If you'd like to use livereload, add `--lr` key with dev task
Example: `gulp dev --lr`. Don't forget ro configure browser-sync config in projectConfig.js file.

File structure
--------------

* Project file structure
    
    - gulpy - usefull functions for gulp and tasks' functions
    - markup — main folder, has modules, scss and templates of pages.
        - static - folder for static files
            - fonts — folder for fonts.
            - images — folder for images.
                - content — images in content (images in articles and etc.)
                - plugins — images for plugins. There are could be files and directories
                - sprite — images for sprite. Even image has to be named with unique name, which will be use in css to paste sprited image.
            - js — folder for js.
                - html5shiv — folder with htm5shiv. 
                - libs - folder for js-libs like jquery
                - plugins — folder for plugins js
            - misc - folder for misc files    
            - scss — folder with scss.
                - plugins - folder fo scss for plugins (colud have subdirectories)
                - common.scss — common stylies for project (not required)
                - GUI.scss — GUI-elements stylies (not required)
                - mixins.scss — mixins (not required)
                - reset.scss — reset css (not required)
                - sprite.scss — scss for sprite generator
                - vars.scss — vars of the project (not required)
                - fonts.scss — scss for fonts of the project (not required)    
        - modules — folder with modules.
            - _template — folder with template module.
                - assets — for the module.
                - ie - scss-files for old ie browsers (ie8.scss and ie9.scss could be here) 
                - _template.jade — template of the module.
                - _template.js — js file of the module.
                - _template.scss — scss file of the module.
        - pages - pages folder
            - _template.jade — template of the page.

* Dev version of compiled project
    
    - static
        - css — folder with css.
        - fonts — folder with fonts.
        - img — folder with images.
            - assets — folder with images for modules.
            - content — folder with images for content.
            - plugins — folder with images for plugins.
            - sprite.png — sprite image.
        - js — folder with js.
            - html5shiv — folder with js-files which have to be separate. There are htm5shiv. 
            - libs - folder for js-libs like jquery.
            - main.js — main.js file.

    - template.html — generated template


* Build version is a copy of dev version, but it has minified version of css and js files. There are no any console.log and debugger code in js. Sprite image is minified (not for Windows7 64bit, but I'll repear it soon).
Each build dir has it's own version. Version is a date of building, but you can change it.