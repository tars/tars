Changelog
=========

Версия 1.2.0
------------

* Обновлен модуль browser-sync.
* Опция baseDir для browser-sync перемещена в tars-config.
* Вотчеры используют модуль <a href="https://github.com/paulmillr/chokidar" target="_blank">chokidar</a>.
* Все вотчеры переехали в отдельные файлы в папку tars/watchers.
* Сделана автозагрузка вотчеров и тасков в gulpfile.
* Таск 'builder-start-screen' переехал в tars/tasks/services.
* Добавлены новые хэлперы в handlebars (и документация по ним). Все хелперы хранятся в отдельном файле tars/helpers/handlebars-helpers.js
* Добавлена папка framework по пути markup/static/js Папка предназначена для js-файлов используемого фреймворка.
* Обновлены зависимости.
* Изменился синтаксис подключения модулей при использовании Handlebars. Старый синтаксис:
```handlebars
{{> modules/head/head head.defaults}}
```

Новый:
```handlebars
{{> head/head head.defaults}}
```

*

Версия 1.1.1
------------

* Исправлен баг в таске переноса js из separate-js. Было указано старое название папки.

Версия 1.1.0
------------

* Добавлен user-package.json для пользовательских зависимостей. Изменения в tars/helpers/install-additional-deps.js
* Добавлено <a href="update-guide.md" target="_blank">руководство по обновлению TARS</a>
* Обновлен модуль gulp-sass.
* Генерация версии сборки перенесена в отдельный хелпер, что упрощает ее кастомизацию. Находится тут: tars/helpers/set-build-version.js