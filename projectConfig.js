var projectConfig = {

    // Sprites config
    // Switch to true, if you're going to use svg images
    useSVG: false,

    // What kind of size of images are you going to you.
    // 96 — 1 dppx (regular)
    // 144 — 1.5 dppx
    // 192 — 2 dppx (retina)
    // 288 - 3 dppx (nexus 5, for example)
    // Example if using for all displays: usePpi: [96, 144, 192, 288]
    useDpi: [96],

    //Config for Notify module
    notifyConfig: {
    
        // Do you need to use notify?
        // true/false
        useNotify: true,

        // Title for notifier
        // String
        title: 'MarkupBuilder notification',

        // Error view
        // Function, returns string
        errorMessage: function(error) {
            return 'Something is wrong.\nLook in console.\n' + error;
        },

        // Sounds notifactions
        // String (name of system sound) or undefined, if you don't need to hear any sounds
        sounds: {

            // Sound after successfull finishing of task
            onSuccess: undefined, // For example 'Glass' in OS X

            // Sound after unsuccessfull finishing of task
            onError: undefined //Don't work yet :(
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
    }
}

if (typeof module != 'undefined') {
    module.exports = projectConfig;
}