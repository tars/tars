
Options
-------

You can configure many options of builder.

* Work with images
    
    — useSVG (true/false)
    
        Would you like to use SVG-graphic or not? (more info about svg in %NAME% here %LINK%)

        false by default.


    — useDpi (array of dpi. Can be [96, 144, 192, 288])

        What kind of size of images would you like to use in your project.
        96 — 1 dppx (regular)
        144 — 1.5 dppx (some tabltes and smartphones)
        192 — 2 dppx (retina)
        288 - 3 dppx (nexus 5, for example)
        You can choose anyone dpi. For example [96, 192] only.
        (more info about different dpi in %NAME% here %LINK%)

        [96] by default


* Config for Notify module

    — useNotify (true/false)

        Would you like to use notifier?

        true by default

    
    — title (string)
    
        A string, which will be showed on notify banner
    
        '%NAME% notification'
    
    
    — errorMessage (function, returns string)

        View function for error output
        It gets error object, and pass it to view generator function, which returns string

        Default: 
        errorMessage: function(error) {
            return 'Something is wrong.\nLook in console.\n' + error;
        },
    

    — sounds 

        Sounds for notifications

            — onSucces (name of system sound (string) or undefined)

                You can choose the sound notification on file changing. Just type the sound name (system sound) to hear sound's notifications.

                undefined by default
        
    
    — taskFinishedText (string)

        Label for timestamp of task finishing time

        Defaults: 'Task finished at: '
        

* Config for BrowserSync module

    — port (number, max is 65000)
        
        Port of local server for browser-sync
        
        Defaults: port: 3004
    

    — open (true/false)
        
        Switch to false, if you don't need to open browser in dev mode
        
        Defaults: open: true
        

    — browser (string (browser name))    

        Choose browser to open

        Defaults: browser: "google chrome"

    
    — startUrl (string, (-t относительный адресс))

        Choose the page to open in browser at first opening
        
        Defaults: startUrl: "/index.html"

    
    useNotifyInBrowser (true/false)
        
        If you don't need to see notification in browser, switch to false
        
        Defaults: useNotifyInBrowser: true