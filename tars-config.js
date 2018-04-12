'use strict';

module.exports = {

    /////////////////////
    // MUTABLE OPTIONS ////////////////////////////////
    // YOU CAN CHANGE THIS OPTIONS ALL THE TIME      //
    //                                               //
    // You need to restart builder to apply options. //
    ///////////////////////////////////////////////////

    /**
     * Postprocessors for TARS
     * @type {Array}
     * Example:
     *
     * postcss: [
     *     {
     *         name: 'postcss-short',
     *         options: {
     *             deny: ['text']
     *         }
     *     }
     * ]
     */
    postcss: [],

    svg: {
        active: true,
        // symbols, sprite
        workflow: 'sprite',
        symbolsConfig: {
            // separate-file, separate-file-with-link, inject
            loadingType: 'inject',
            usePolyfillForExternalSymbols: true,
            pathToExternalSymbolsFile: ''
        }
    },

    css: {
        // concat, manual
        workflow: 'concat'
    },

    js: {
        // concat, modular
        workflow: 'concat',

        // Only webpack is available right now
        bundler: 'webpack',

        /**
         * Use linting of js-files
         * @type {Boolean}
         */
        lint: true,

        /**
         * Use babel for ES6(ES7-ESNext) syntax support
         * @type {Boolean}
         */
        useBabel: true,

        /**
         * Remove console.log and debugger from js code in release mode
         * @type {Boolean}
         */
        removeConsoleLog: true,

        // Special config for webpack
        webpack: {
            useHMR: false,

            /**
             * Automatically loaded modules.
             * Module (value) is loaded when the identifier (key) is used as free variable in a module.
             * The identifier is filled with the exports of the loaded module.
             * Example: {$: "jquery"} or {React: 'react'}
             * @type {Object}
             */
            providePlugin: {}
        },

        /**
         * Path-strings to js-files, which have to be included before modules' js-files
         * Example: ['./markup/controller/** /*.js']
         * @type {Array}
         */
        jsPathsToConcatBeforeModulesJs: [],

        /**
         * Lint additional js before modules
         * @type {Boolean}
         */
        lintJsCodeBeforeModules: false,

        /**
         * Path-strings to js-files, which have to be included before modules' js-files
         * @type {Array}
         */
        jsPathsToConcatAfterModulesJs: [],

        /**
         * Lint additional js after modules
         * @type {Boolean}
         */
        lintJsCodeAfterModules: false
    },

    /**
     * Write sourcemaps
     * @type {Object}
     *
     * active – is sourcemaps active
     * inline – use inline sourcemaps or in separate file
     */
    sourcemaps: {
        js: {
            active: true,
            inline: true
        },
        css: {
            active: true,
            inline: true
        }
    },

    /**
     * Config for Notify module
     * @type {Object}
     */
    notifyConfig: {

        /**
         * Do you need to use notify?
         * @type {Boolean}
         */
        useNotify: true,

        /**
         * Title for notifier
         * @type {String}
         */
        title: 'TARS notification',

        /**
         * Sounds notifactions
         * String (name of system sound) or undefined, if you don't need to hear any sounds
         * @type {Object}
         */
        sounds: {

            /**
             * Sound after successfull finishing of task
             * @type {String, undefined}
             * For example 'Glass' in OS X
             */
            onSuccess: undefined,

            /**
             * Sound after failed finishing of task
             * @type {String, undefined}
             * For example 'Glass' in OS X
             */
            onError: undefined
        },

        /**
         * Label for timestamp of task finishing time
         * @type {String}
         */
        taskFinishedText: 'Task finished at: '
    },

    /**
     * Minify result html in build version
     * If is set to false, compiled html will be prettified
     * @type {Boolean}
     */
    minifyHtml: false,

    /**
     * TARS will generate relative path from current page
     * to static files in case of true value
     * @type {Boolean}
     */
    generateStaticPath: true,

    /**
     * Path to build version of project
     * Could be like '../../../build' or absolute path
     * @type {String}
     */
    buildPath: './builds/',

    /**
     * Use build versioning
     * Build version is a date ot building
     * @type {Boolean}
     */
    useBuildVersioning: true,

    /**
     * Use archiver for your build
     * @type {Boolean}
     */
    useArchiver: true,

    /**
     * Set ulimit. Topical for Linux-family OS and OSX.
     * @type {Number}
     */
    ulimit: 4096,

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    ////////////////////////////////////////////////////////
    // YOU CAN CHANGE THIS OPTIONS AND USE REINIT         //
    //                                                    //
    // Options for technologies, which you'd like to use. //
    ////////////////////////////////////////////////////////

    /**
     * Templater
     * Available 'pug', 'jade' and 'handlebars'
     * @type {String}
     */
    templater: 'handlebars',

    /**
     * Css-preprocessor
     * Available 'scss', 'less' or 'stylus'
     * .sass extension is supported if cssPreprocessor is 'scss'
     * @type {String}
     */
    cssPreprocessor: 'scss',

    /**
     * What kind of size of images are you going to use.
     * 96 — 1 dppx (regular)
     * 192 — 2 dppx (retina)
     * 288 — 3 dppx (nexus 5, for example)
     * 384 - 4 dppx (nexus 6, for example)
     * Example if using for all displays: usePpi: [96, 192, 288, 384]
     * You can change with options not only on init or reinit,
     * but at with time you have to create new directories
     * and delete unused.
     * @type {Array}
     */
    useImagesForDisplayWithDpi: [96],

    ////////////////////////////////////////////////
    ////////////////////////////////////////////////

    ////////////////////////////////////////////////////////
    // You have to change with options after manually      //
    // renaming static and img folder                     //
    //                                                    //
    // Do not rename these dirs before reinit             //
    ////////////////////////////////////////////////////////

    /**
     * File structure settings
     * @type {Object}
     */
    fs: {

        /**
         * Name of folder with static files, such *.css, *.js and so on
         * 'static' by default
         * @type {String}
         */
        staticFolderName: 'static',

        /**
         * Name of folder with images
         * 'img' by default
         * @type {String}
         */
        imagesFolderName: 'img',

        /**
         * Name of folder with modules
         * 'modules' by default
         * @type {String}
         */
        componentsFolderName: 'components'
    }

    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
};
