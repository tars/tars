markupBuilder
=============

Markup builder on gulp

You have to install `nodeJS` and `npm` to use markupBuilder.

Installation
------------

    npm i or npm install

Install gulp and webfonts globaly and all dependencies.    

Descritpion
-----------

Main folder of project is markup. There are modules, scss-files and templates of pages.
Even module is a part of page, for example — «header».
Even module has it's own temaplte, scss-files, js and images.
There are templates of pages in root directory of markup. To create new page just create new file with the name of the page.

Modules have to be included into the pages templates. Also modules could include other modules.

You shouldn't use prefixes, autoprefixer do it itself. JSHint will check yor js-code.


Main commands
-------------

`gulp clean-dev` — clean dev directory (public). Delete this directory.

`gulp clean-build` — clean build directory (build). Delete this directory.

`gulp clean-all` — clean dev and build directories.

`gulp dev` — development task. Create compiled project and watch for changes in project's files. Call clean-dev and build-dev. 

`gulp build-dev` — just generate public version of project.

`gulp build` — create build version of project.

You can use key `--gf`, if you need to generate woff, eot and svg files of your font. 
Example: `gulp build --gf`. This command build project and generate fonts files into font folder in build. All you is ttf-file of your font in folder fonts in root directory.

File structure
--------------

* Project file structure

    - images — folder for images.
        - content — images in content (images in articles and etc.)
        - for-plugins — images for plugins. There are could be files and directories
        - for-sprite — images for sprite. Even image has to be named with unique name, which will be use in css to paste sprited image.
    - js — folder for js.
    - fonts — folder for fonts.
    - markup — main folder, has modules, scss and templates of pages.
        - modules — folder with modules.
            - simple-module — folder with module.
                - assets — (not required) for the module.
                - simple-module.jade — template of the module.
                - simple-module.js — js file of the module.
                - simple-module.scss — scss file of the module.
        - scss — folder with scss.
            - common.scss — common stylies for project (not required)
            - GUI.scss — GUI-elements stylies (not required)
            - mixins.scss — mixins (not required)
            - reset.scss — reset css (not required)
            - sprite.scss — scss for sprite generator
            - vars.scss — vars of the project (not required)
        - developer.scss — scss file for developers stylies. Required! 
        - main.scss — main file for scss. All scss files include into this file.
        - template.jade — template of the page.

* Dev version of compiled project
    
    - css — folder with css.
    - fonts — folder with fonts.
    - img — folder with images.
        - assets — folder with images for modules.
        - content — folder with images for content.
        - for-plugins — folder with images for plugins.
        - sprite.png — sprite image.
    - js — folder with js.
        - vendors — folder with js-files which have to be as single files.
        - main.js — main.js file.

    - template.html — generated template


* Build version is a copy of dev version, but has minified version of css and js files. There are no any console.log and debugger code in js.


TODO
----

* Image optimazer.
* Watch new files (Mac OS)
* Livereload (may be)
* Creating zip-archive of build version
* Font-generator
* Notify including
* Each task in their own folders
* Jshint for scss
* Less (may be)
