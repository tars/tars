var projectConfig = {

////////////////////////////////////////////////////////
// You have to hange with options after manually      //
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
        imagesFolderName: 'img'
    },

////////////////////////////////////////////////////
////////////////////////////////////////////////////


////////////////////////////////////////////////////////
// YOU CAN CHANGE THIS OPTIONS AND USE REINIT         //
//                                                    //
// Options for technologies, which you'd like to use. //
////////////////////////////////////////////////////////

    /**
     * Templater
     * Available 'jade' and 'handlebars'
     * @type {String}
     */
    templater: 'handlebars',

    /**
     * Css-preprocessor
     * Available 'scss', 'less' or 'stylus'
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


/////////////////////
// MUTABLE OPTIONS ////////////////////////////////
// YOU CAN CHANGE THIS OPTIONS ALL THE TIME      //
//                                               //
// You need to restart builder to apply options. //
///////////////////////////////////////////////////

    /**
     * Autoprefixer config
     * @type {Array}
     */
    autoprefixerConfig: ['last 2 version', 'safari 5', 'opera 12.1', 'ios 6', 'android 4'],

    /**
     * Use svg images
     * @type {Boolean}
     */
    useSVG: true,

    /**
     * Use linting and hinting of js-files
     * @type {Boolean}
     */
    useJsLintAndHint: true,


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
    lintJsCodeAfterModules: false,


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
        title: 'MarkupBuilder notification',

        /**
         * Sounds notifactions
         * String (name of system sound) or undefined, if you don't need to hear any sounds
         * @type {Object}
         */
        sounds: {

            /**
             * Sound after successfull finishing of task
             * @type {String, undefined}
             */
            onSuccess: undefined, // For example 'Glass' in OS X
        },

        /**
         * Label for timestamp of task finishing time
         * @type {String}
         */
        taskFinishedText: 'Task finished at: '
    },


    /**
     * Config for browser-sync module
     * @type {Object}
     */
    browserSyncConfig: {
        /**
         * Port of local server for browser-sync
         * @type {Number}
         */
        port: 3004,

        /**
         * Switch to false, if you don't need to open browser in dev mode
         * @type {Boolean}
         */
        open: true,

        /**
         * Choose browser to open
         * @type {String}
         */
        browser: 'google chrome',

        /**
         * Choose the page to open in browser at first opening
         * @type {String}
         */
        startUrl: '/index.html',

        /**
         * If you don't need to see notification in browser, switch to false
         * @type {Boolean}
         */
        useNotifyInBrowser: true
    },

    /**
     * Remove console.log and debugger from js code in release mode
     * @type {Boolean}
     */
    removeConsoleLog: true,

    /**
     * Minify result html in build version
     * @type {Boolean}
     */
    minifyHtml: false,

    /**
     * Beginning of path for static files
     * You have to use %=staticPrefix=% placeholder in paths to static
     * Example: %=staticPrefix=%/img/logo.png
     * Will be replaced to '/static/img/logo.png'
     * @type {String}
     */
    staticPrefix: '/static',

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
    useArchiver: true

//////////////////////////////////////////////
//////////////////////////////////////////////
};

module.exports = projectConfig;