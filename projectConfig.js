var projectConfig = {

////////////////////////////////////////////////////
// YOU CAN'T CHANGE THIS OPTIONS AFTER FIRST INIT //
////////////////////////////////////////////////////

    // File structure settings
    fs: {
        //Name of folder with static files, such *.css, *.js and so on
        // 'static' by default
        staticFolderName: 'static',

        //Name of folder with images
        // 'img' by default
        imagesFolderName: 'img'
    },

////////////////////////////////////////////////////
////////////////////////////////////////////////////


////////////////////////////////////////////////
// YOU CAN CHANGE THIS OPTIONS AND USE REINIT //
////////////////////////////////////////////////

// What kind of templater would you like to use
    // String: 'jade' or 'handlebars'
    templater: 'jade',

    // What kind of css-preprocessor would you like to use
    // String: 'scss' or 'less'
    cssPreprocessor: 'scss',

    // What kind of size of images are you going to you.
    // 96 — 1 dppx (regular)
    // 144 — 1.5 dppx
    // 192 — 2 dppx (retina)
    // 288 - 3 dppx (nexus 5, for example)
    // Example if using for all displays: usePpi: [96, 144, 192, 288]
    useImageWithDpi: [96],

////////////////////////////////////////////////
////////////////////////////////////////////////


/////////////////////
// MUTABLE OPTIONS ///////////////////////////
// YOU CAN CHANGE THIS OPTIONS ALL THE TIME //
//////////////////////////////////////////////

    // Sprites config
    // Switch to true, if you're going to use svg images
    useSVG: true,


    // Use linting and hinting of js-files
    useJsLintAndHint: true,


    // Array of string of paths
    // Example: ['./markup/pages/controller/**/*.js']
    jsPathsToConcatBeforeModulesJs: [],

    // Lint additional js before modules
    // If useJsLintAndHint is false, with option is disabled
    lintJsCodeBeforeModules: false,

    // Array of string of paths
    // Example: ['./markup/pages/controller/**/*.js']
    jsPathsToConcatAfterModulesJs: [],

    // Lint additional js after modules
    // If useJsLintAndHint is false, with option is disabled
    lintJsCodeAfterModules: false,


    //Config for Notify module
    notifyConfig: {
    
        // Do you need to use notify?
        // true/false
        useNotify: true,

        // Title for notifier
        // String
        title: 'MarkupBuilder notification',

        // Sounds notifactions
        // String (name of system sound) or undefined, if you don't need to hear any sounds
        sounds: {

            // Sound after successfull finishing of task
            onSuccess: undefined, // For example 'Glass' in OS X
        },

        // Label for timestamp of task finishing time
        taskFinishedText: 'Task finished at: '
    },


    // Config for browser-sync module
    browserSyncConfig: {
        // Port of local server for browser-sync
        port: 3004,
        // Switch to false, if you don't need to open browser in dev mode
        open: true,
        // Choose browser to open
        browser: "google chrome",
        // Choose the page to open in browser at first opening
        startUrl: "/index.html",
        // If you don't need to see notification in browser, switch to false
        useNotifyInBrowser: true
    },

    useArchiver: true
};


//////////////////////////////////////////////
//////////////////////////////////////////////

module.exports = projectConfig;