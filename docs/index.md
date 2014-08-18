??
front-end (frontend)
??

— About
— Top-features
— Required components




About
-----

%NAME% — markup builder on gulp for fast and easy development of your project's front-end. HTML-templater and CSS-preprocessors helps you to write less code, but do more, (-t структуризировать) your code. %NAME% will be good for teams and individual developers.

It has got file structure (FS) for making (-t понятную), well and easy-scalable markup. Current FS is required, but you could (-t расширять) it. But you have to write your own tasks and watchers to act with your folders and files.

%NAME% uses gulp, so you can watch for file changing, all tasks work in (-t потоках). Gulp is really fast and well-understanding task-manager.


Top features
------------

— HTML5 framework (use html5shiv for old browsers, meta and etc.)
— Quite clear, well-understanding file structure (more info %LINK%)
— Use Jade as HTML-templater
— SCSS for css (mixins, vars and many other things)
— Autoprefixer. So you don't need to write vendor prefixes in your css
— (-t отдельные) css for ie9 and ie8. So, your main file is quite clean
— JS hinting and linting (could be configurated in .jscs.json)
— Css and js minification (you have got dev and production version of your css and js)
— Encourages one-file CSS/JS in the view (HTML) for performance
— No external libs (except html5shiv). Yeah, this is a feature, cause you can choose js-libs by yourself
— Open source workflow with Gulpjs running on Node.js
— Watching for file-changing
— Notifier about file-changing with sound (optional) and system popups (optional)
— Livereload by browserSync (optional)
— You can add your custom task and watchers in builder
— Helps you to work with images for high resolution displays (more info here %LINK%)
— Create png-sprites for different dpi
— Works with vector graphics (svg. Also prepeare png-fallback for old browsers)
— Generate woff-, eot- and svg-files of your font from ttf-file (works only on Mac)
— Create build version of project with time of building in name. Also create an archive of build.

You can configure quite many options of builder (use notifier, use SVG-images and many others. Check it in the root directory).


Required components
-------------------

%NAME% works with NodeJs. Also you need npm (nowsdays, npm is provided with NodeJs).
Also you need Java for font-generator.
If you use windows and would like to see notifier messages, you need growl for windows %LINK%
Aaand, that is all.

All other dependencies will be installed by npm automaticly by using 'npm install'