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

Also, you can use css-files and not to include them to bundle. There is folder separate-css in static/scss, where you can store all files, which have to be included manually. There is an example of including in any template:

```handlebars
<link href="%=static=%css/separate-css/your-file.css" rel="stylesheet" type="text/css">
```

**%=staticPrefix=% prefixe works, but this prefixe is depricated! Use just %=static=% or \_\_static\_\_!**
