<p align="right">
English description | <a href="../ru/css-processing.md">Описание на русском</a>
</p>

# CSS

You can use folowing CSS-preprocessors:
* [Scss](http://sass-lang.com) .sass extension is supported;
* [Less](http://www.lesscss.org);
* [Stylus](http://learnboost.github.io/stylus)  

You can choose CSS-preprocessor in [tars-config.js](options.md#csspreprocessor).

In general, there are no surprises when using CSS-preprocessor. Use all the possibilities offered by the selected tool.

If you are used to the usual CSS, you can use CSS-syntax in any preprocessor.

TARS supports two workflows for CSS-code processing:
* [css concatenation](css-concat-processing.md);
* [css manual processing](css-manual-processing.md).

All info below is general for both workflows.

Все, что описано ниже справедливо для обоих подходов.

All files with a `_` prefix won't be compiled by the builder. You should use these files for imports. Actually, you can import any files you want, but if you import a file without `_` you will have two copies in the compiled CSS file. This is the reason why files with `_` prefix won't be compiled. You can import all types of style files: `scss` (`sass`), `less`, `styl`, `css`.
Example of import using `scss`:

```scss
// files are located in one directory
@import '_partial.scss';

// _partial.sass is located in neighbour directory `partials`
@import '../partials/_partial.sass';
```

If you need to include files from `node_modules` or `bower_components`, you don't have to write full path to `node_modules`, you can use short syntax, TARS will expand the path like this:

```scss
@import 'bootstrap/dist/bootstrap.scss';
```

In case of that import TARS will try to find `bootstrap/dist/bootstrap.scss` in `node_modules` and `bower_components`. This feature is implemented in TARS from version 1.7.0

If you want to include the files from the static directory (pictures), you should use the placeholder %=static=%. Then including of the image as a background (in current example the picture will be taken from your main component) will be as follows (in this example scss is used):

```scss
.main {
    background: url('%=static=%assets/main/bg.png') repeat;
}
```

**%=staticPrefixForCss=% prefix works, but this prefix is deprecated! Use just `%=static=%`! This prefix works in TARS from version 1.6.0**

There are a couple of points on the organization  of `scss|sass|less|styl` files (e.g scss is selected):

* Each component has its own css-representation.
* Common styles for the project are recommended to put in common.scss in static/scss
* Fonts are included in `fonts.scss`
* Mixins are in `mixins.scss`
* UI-elements styles are in `GUI.scss`
* Variables are in `vars.scss`
* Libraries styles are in `static/scss/libraries` (may contains subfolders and css-files).
* Styles for plugins are in `static/scss/plugins` (may contains subfolders and css-files).
* Styles which can't be put under categories listed above have to be put in `static/scss/etc/etc.{scss,css}`.
* In the main folder with css (in this case, scss folder) you can not create new files (except when you correct task by yourself connected with working with css). New files can be created only in the `static/scss/plugins|libraries|etc|separate-css`.

If you'd like to use library from bower or npm package, you can import styles from package by using `@import`.

For IE8 and IE9 you can add fixes in a folder in the ie component folder. You need to create `ie8.{scss,sass,css}` or `ie9.{scss,sass,css}`.

