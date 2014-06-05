markupBuilder
=============

Markup builder on gulp

You have to install `nodeJS` and `npm` to use markupBuilder.

Installation
------------

    npm i or npm install

Descritpion
-----------

Main folder of project is markup. There are modules, scss-files and templates of pages.
Even module is a part of page, for example — «header».
Even module has it's own temaplte, scss-files, js and images.
In root directory of markup there are templates of pages. To create new page just create new file with the name of the page.

Modules have to been included into the pages templates. Also modules colud include other modules.


Main commands
-------------

`gulp clean-dev` — clean dev directory (public). Delete this directory.

`gulp clean-build` — clean build directory (build). Delete this directory.

`gulp clean-all` — clean dev and build directories.

`gulp dev` — development task. Create compiled project and watch for changes in project's files. Call clean-dev and build -public. 

`gulp build-public` — just generate public version of project.

`gulp build` — create build version of project. You have to generate dev version at first (use gulp dev or gulp build-public).

File structure
--------------

* Project file structure

    - images — folder for images.
        - content — images in content (images in articles and etc.)
        - for-plugins — images for plugins. There are could be files and directories
        - for-sprite — images for sprite. Even image has to be named with unique name, which will be use in css to paste sprited image.
    - js — folder for js.
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
    - img — folder with images.
        - assets — folder with images for modules.
        - content — folder with images for content.
        - for-plugins — folder with images for plugins.
        - sprite.png — sprite image.
    - js — folder with js.
        - vendors — folder with js-files which have to be as single files.
        - main.js — main.js file.

    - template.html — generated template


* Build version is a copy of dev version, but has minified version of css and js files.


TODO
----

* Image optimazer.
* Watch new files (Mac OS)
* Livereload (may be)
* Creating zip-archive of build version

