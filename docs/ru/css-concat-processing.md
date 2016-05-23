<p align="right">
<a href="../en/css-concat-processing.md">English description</a> | Описание на русском
</p>

# CSS concat processing

Склейка стилей происходит в следующем порядке:
* Normalize
* Стили для библиотек
* Mixins, sprites
* Fonts
* Vars
* GUI
* Common stylies (common.scss)
* Стили для плагинов (static/scss/plugins, включая все поддиректории)
* Стили компонентов (.css поддерживается)
* Стили из etc.{scss,css}

Также есть возможность использовать CSS-файлы, не включая их в общий бандл. Для этого в папке static/scss есть папка separate-css, в которой вы можете положить все css-файлы, подключением которых вы будете управлять самостоятельно. Пример подключения такого файла в любом шаблоне:

```handlebars
<link href="%=static=%css/separate-css/your-file.css" rel="stylesheet" type="text/css">
```

**Префикс %=staticPrefix=% все еще работает, но крайне не желательно его использовать, так как в будущих версиях он будет удален! Используйте просто %=static=% или \_\_static\_\_!**
