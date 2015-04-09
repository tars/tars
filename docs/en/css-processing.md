# CSS

You can use [scss](http://sass-lang.com), [less](http://www.lesscss.ru) или [stylus](http://learnboost.github.io/stylus) as css-preprocessor. You can choose css-preprocessor in [tars-config.js](options.md#csspreprocessor).

In general, there are no surprises when using css-preprocessor. Use all the possibilities offered by the selected tool.

If you are used to the usual css, you can use css-syntax in any preprocessor.

If you want to include the files from the static directory (pictures), you must use the placeholder %=staticPrefixForCss=% (value of the placeholder is adjusted in the [tars-config.js](options.md#staticprefixforcss)). Then including of the image as a background (the picture will be taken from your main module) will be as follows (in this example scss is used):

```scss
.main {
    background: url('%=staticPrefixForCss=%assets/main/bg.png') repeat;
}
```

There are a couple of points on the organization scss|less|styl-files (scss is selected):

* Each module has its own css-representation.
* Common styles for the project is recommended to put in common.scss in static/scss
* Included fonts' styles is in fonts.scss
* Mixins are in mixins.scss
* UI-elements styles are in GUI.scss
* Variables are in vars.scss
* Libraries styles are in static/scss/libraries (may contains sub-folders).
* Styles for plugins are in static/scss/plugins (may contains sub-folders).
* Styles that we don't now where determine have to be put in static/scss/etc/etc.scss.
* In the main folder with css (in this case, scss folder) you can not create new files (except when you correct task by yourselves connected with working with css). New files can be created only in the static/scss/plugins and libraries.

Union of styles will be in the following order:
* Normalize
* Стили для библиотек
* Mixins, sprites
* Fonts
* Vars
* GUI
* Common stylies (common.scss)
* Styles for plugins (static/scss/plugins, including all subdirectories)
* Modules' styles
* Styles of etc.scss

For IE8 and IE9 you can add fixes in a folder in the ie module folder. You need to create ie8.scss or ie9.scss
