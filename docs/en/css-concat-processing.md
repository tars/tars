<p align="right">
English description | <a href="../ru/css-concat-processing.md">Описание на русском</a>
</p>

# CSS concat processing

Concatenation of styles will be in the following order:
* Normalize
* Styles for libraries
* Mixins, sprites
* Fonts
* Vars
* GUI
* Common stylies (common.scss)
* Styles for plugins (static/scss/plugins, including all subdirectories)
* Components' styles (css is supported)
* Styles of etc.{scss,css}

Also, you can use css files not including them into the bundle. There is a folder `separate-css` in `static/scss`, where you can store all files, which have to be included manually. There is an example of including in any template:

```handlebars
<link href="%=static=%css/separate-css/your-file.css" rel="stylesheet" type="text/css">
```

**%=staticPrefix=% prefix works, but this prefix is deprecated! Use just `%=static=%`!**
