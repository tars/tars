var projectConfig = {

/////////////////////////////////////////////////////
// If you rename static and img folder manually,   //
// you can change with options.                    //
// !IMPORTANT!: you can't change with options      //
// before reinit.                                  //
// If you'd like to change with options            //
// and do reinit:                                  //
// 1) rename static directory and img to default;  //
// 2) reinit builder with new options;             //
// 3) rename static directory and img as you wish. //
/////////////////////////////////////////////////////

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


////////////////////////////////////////////////////////
// YOU CAN CHANGE THIS OPTIONS AND USE REINIT         //
//                                                    //
// Options for technologies, which you'd like to use. //
////////////////////////////////////////////////////////

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
    // You can change with options not only on init or reinit,
    // but at with time you have to create new directories 
    // and delete unused.
    useImageWithDpi: [96],

////////////////////////////////////////////////
////////////////////////////////////////////////


/////////////////////
// MUTABLE OPTIONS ////////////////////////////////
// YOU CAN CHANGE THIS OPTIONS ALL THE TIME      //
//                                               //
// You need to restart builder to apply options. //
///////////////////////////////////////////////////
    
    

    // Generate stylies for ie8
    useIE8Stylies: true,

    // Generate stylies for ie9
    useIE9Stylies: true,    


    // Sprites config
    // Switch to true, if you're going to use svg images
    useSVG: true,


    // Use linting and hinting of js-files
    useJsLintAndHint: true,


    // Array of string of paths
    // Example: ['./markup/controller/**/*.js']
    jsPathsToConcatBeforeModulesJs: [],

    // Lint additional js before modules
    // If useJsLintAndHint is false, with option is disabled
    lintJsCodeBeforeModules: false,

    // Array of string of paths
    // Example: ['./markup/controller/**/*.js']
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

    // Use build versioning
    // Build version is a date ot building
    useBuildVersioning: true,

    // Use archiver for your build
    useArchiver: true
};


//////////////////////////////////////////////
//////////////////////////////////////////////

module.exports = projectConfig;