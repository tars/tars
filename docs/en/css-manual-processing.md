<p align="right">
English description | <a href="../ru/css-manual-processing.md">Описание на русском</a>
</p>

# CSS manual processing

This workflow will be usefull, if you need to control css processing by yourself. You can use manual css processing in TARS from version 1.8.0

Main entry points, style files which will contain imports for project style, are located at `static/scss/entry`. By default there will be one entry point created - `main.scss`. You can add more if you wil need it. These files will be compiled by a preprocessor. Your project files should be connected by adding them to entry point files via `@import` directive.

`main.scss` entry point connection is already described in templates (`components/head`). In case you add new entry points, you need to connect them in templates by hand.

`main.css` contents:

```scss
@import '../normalize.scss';

/* Libraries, which is used in current project. */
@import 'partials/_libraries.scss';

/* Libraries, which is used in current project. */
@import 'built-in-partials/_service.scss';

/* Plugins, which is used in current project. */
@import 'partials/_plugins.scss';

/* Components, which is used in current project. */
@import 'partials/_components.scss';

/* Additional style files. */
@import '../etc/etc.scss';
```

Entry point imports `normalize.scss`, then partial, where you can import libraries, then build-in partials (mixins for graphics, etc.), then partial with plugins, partial with components and lastly additional styles.

Partial with components means that you will import your components' styles into that file specifically. But you don't need to use full relative path to compontnts' style from your partial. You can do like this:

```scss
@import 'components/_template/_template.scss';
```

Including styles for plugins and libraries from `node_modules` and `bower_components` is described  in [general style documentation](css-processing.md).

**Warning:** Do not edit files in `build-in-partials` directory as they can be overwritten on project update.

Also there is an `ie` directory in entry points, which contains entry points for ie8 (files should have `_ie8` suffix) and ie9 (files should have `_ie9` suffix).

Take note that only ie8 and ie9 specific styles should be included there, general styles will be added by default.

