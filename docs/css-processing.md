CSS
===

В качестве css-препроцессора можно использовать <a href="http://sass-lang.com/" target="_blank">scss</a>, <a href="http://www.lesscss.ru/" target="_blank">less</a> или <a href="http://learnboost.github.io/stylus/" target="_blank">stylus</a>. Css-препроцессор выбирается в projectConfig.js

В целом, нет каких-либо неожиданностей при использовании css-препроцессора. Используем все возможности, которые предоставляет выбранный инструмент.

Если вы привыкли к обычному css, то можно выбрать less или scss и использовать в файлах стилей обычный css,

Есть пара моментов по организации scss|less|styl-файлов:

* Каждый модуль имеет свое css-представление.
* Общие стили для проекта рекомендуется складывать в common.scss|less|styl в static/scss|less|styl
* Подключени шрифтов в fonts.scss|less|styl
* Миксины в mixins.scss|less|styl
* Описание стилей UI-элементов в GUI.scss|less|styl
* Переменные в vars.scss|less|styl
* Стили для плагинов в static/scss|less|styl/plugins (может содержать подпапки)
* Стили, которые не ясно, куда определить, помещаем в static/scss|less|styl/etc/etc.scss|less|styl

Склейка стилей происходит в следующем порядке:
* Normalize
* Mixins, sprites
* Fonts
* Vars
* GUI
* Common stylies (common.scss|less|styl)
* Стили для плагинов
* Стили модулей
* Стили из etc.scss|less|styl

Для браузеров ie8 и ie9 можно размещать отдельные фиксы в папке ie в папке модуля. Нужно создать ie8.scss|less|styl или ie9.scss|less|styl, в соответствии с тем, в какой браузер вносится фикс.

