markupBuilder
=============

Markup builder on gulp
It uses Jade as templater, scss as preprocessor for css, lint for js files, font-generator and many other things.

You have to install `nodeJS` version >= 0.8 and `npm` for using markupBuilder.
Also you need Java for webfont generator. If you are not going to generate fonts, you don't need it.

There are no js-libs like jquery and soon (only html5shiv for old ie). You can add all what you want.

Installation
------------

    npm i or npm install

Install gulp, webfonts, browser-sync globaly and all dependencies. 
If you need superuser rights to install packages globaly, you need to run:
    
    sudo npm i -g gulp browser-sync webfonts

After installing of all packages:    

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
Unfortunately, you can generate fonts in OS X only. That'll be repeared it soon.

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
                    - 96dpi 
                    - 144dpi 
                    - 192dpi 
                    - 288dpi - folders for images for sprite with diffirent dppx
                - svg — folder for svg images    
            - js — folder for js.
                - html5shiv — folder with htm5shiv. 
                - libs - folder for js-libs like jquery
                - plugins — folder for plugins js
            - misc - folder for misc files    
            - scss — folder with scss.
                - spritesScss - folder with scss for sprites
                - spriteGeneratorTemplates - folder with templastes for sprite generator
                - plugins - folder fo scss for plugins (colud have subdirectories)
                - common.scss — common stylies for project (not required)
                - GUI.scss — GUI-elements stylies (not required)
                - mixins.scss — mixins (not required)
                - reset.scss — reset css (not required)
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
            - pngSprite
                - 96dpi
                - ...
                - 288dpi — sprites with different dpi
            - rasterSvg — raster svg-files
            - rasterSvgSprite — sprite of raster svg-files    
            — svg — svg images
        - js — folder with js.
            - html5shiv — folder with js-files which have to be separate. There are htm5shiv. 
            - libs - folder for js-libs like jquery.
            - main.js — main.js file.

    - template.html — generated template


* Build version is a copy of dev version, but it has minified version of css and js files. There are no any console.log and debugger code in js. Sprite image is minified, svg includes convert to base64.
Each build dir has it's own version. Version is a date of building, but you can change it.

You can add your own script or css including anywhere. I just can recommend you to do it, like it's been done in default. You can change everything, except File System. You have to use current File System, cause watchers and tasks are depend on it. I'll add config for it in future.
It's a framework, so file system is like a law :)


Work with images
-------------------

I've developed builder, which can works with png-images and svg-images.
Nowadays, we've got displays with really bif resolutions and small size. For example: smartphones with HD defenition (or 4k), monitors and so on. So, when you've done images for regular resolution (1920 x 1080 on 22 inch monitor). And then you open your site (with thats images) on MacBook Pro with retina, and see, your images is really ugly(

There are many ways to decide it. I've recommend you to read [one presentation](http://www.slideshare.net/codefest/codefest-2014-2) from russian developer [Tim Chaptykov](https://github.com/Chaptykov). This presentation on Russian, but i'm sure, you'll understand the basic idea.

The basic idea is — use SVG for web. It's vector, works on all platforms (ie8, shame on you)! But not all images can be on svg. Complex gradients are not so good in svg, so, you still have to use png for with.

Icon-font is god idea, but not for all images. There are a lot of problems with smoothing in different operation system (ms windows for example).

So, SVG and png. It's clear about svg, just use. But there are some problems with png. What will we do with displays with 2 or 3 dppx (192dpi or 288dpi)? You can read about dpi and dppx [here](http://stackoverflow.com/questions/21971331/what-is-dots-per-css-inch-and-dots-per-physical-inch)

You have to have png images in 4 resolutions (It's for all type of displays): 96dpi (1dppx), 144dpi (1.5dppx), 192dpi (2dppx) and 288dpi (3dppx). Of course, you can use only 96dpi with 144dpi images, but it'll be bad for high resolution displays.

So, practise!

First of all, check projectConfig (projectConfig.js in root directory). There are two important options, which we need:

* useSVG
* useDpi

So, if you'd like to use SVG, just switch to true this option. And that is all)
if useDpi you can choose dpi, which you're going to use in you project.

After that, you can add images to your project:

* svg-files to svg directory in static
* png files to sprite directory (each png-file have to be in appropriate folder (depends on it's dpi))

When, you can you two mixins on you modules:

@include bg($imageName, $repeat) for png-sprite.
$imageName is a image name (png) with $-sign in the beginning.
The second param is not required. This param is for background-repeat option. It's 'no-repeat' in default.

This mixin include image from sprite to your block, and include media queries for different resolutions.

Another mixin is:
@include bg-svg($imageName, $repeat)
It's like the first mixin, but include svg file to your block (and png file for ie8. This file will be rastered from svg file). $imageName is a image name (svg).
The second param is not required. This param is for background-repeat option. It's 'no-repeat' in default.


!Note, that you can't use bg-svg mixin, if you have not switched useSvg option to true in projectConfig.
!Raster-task and sprite-compressor can take a lot of time, if you use many images. I'll fix it asap.

Custom tasks
------------

You can add your own task to builder. All examples are already exist. 
You can find Examples of watchers and task declaration in gulpfile.js In gylpy/taskFunctions you can find example of task function.










