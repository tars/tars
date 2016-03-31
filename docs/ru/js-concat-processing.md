<p align="right">
<a href="../en/js-concat-processing.md">English description</a> | Описание на русском
</p>

# Работа с JS с помощью простой склейки

Данный workflow стоит использовать, если у вас простое приложение и нет надобности разрешать зависимости между файлами.

По умолчанию js находится в 2-ух местах:

* В папке со статикой, в подпапке с именем js
* В каждом отдельном модуле.

Можно добавить свои папки для js, используя соответствующую [опцию](options.md#jspathstoconcatbeforemodulesjs-%D0%B8-jspathstoconcataftermodulesjs) в конфиге сборщика.

Весь js-код собирается в один отдельный файл, кроме js-файлов, которые находятся в директории separate-js. Эти файлы просто переносятся как есть в готовую сборку. Примером такого файла является html5shiv.js

Файлы собираются в следующем порядке:

* static/js/framework (включая подпапки)
* static/js/libraries (включая подпапки)
* static/js/plugins (включая подпапки)
* все файлы, пути к которым находятся в опции jsPathsToConcatBeforeModulesJs
* js-файлы модулей
* все файлы, пути к которым находятся в опции jsPathsToConcatAfterModulesJs

Перед сборкой в один файл весь js-код (кроме файлов из static/js) проверяется на соответствие code-style (который описан в конфигурационном файле .jscsrc в коре проекта), а также производится поиск ошибок. Данный проверки [опциональны](options.md#usejslintandhint).

Проверкой файлов из jsPathsToConcatBeforeModulesJs и jsPathsToConcatAfterModulesJs можно управлять отдельно, опциями lintJsCodeBeforeModules и lintJsCodeAfterModules.

Если требуется отключить проверку отдельного файла, то нужно добавить в начало его имени '_'.
