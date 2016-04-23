<p align="right">
<a href="../en/js-concat-processing.md">English description</a> | Описание на русском
</p>

# Работа с JS с помощью простой склейки

Данный workflow стоит использовать, если у вас простое приложение и нет надобности разрешать зависимости между файлами. При выборе данного подхода все JavaScript-файлы склеиваются в один общий файл в определенном порядке. Порядок и правила склейки описаны ниже.

По умолчанию JavaScript находится в 2-ух местах:

* В папке со статикой, в подпапке с именем js
* В каждом отдельном компоненте.

Можно добавить свои папки для js, используя соответствующую [опцию](options.md#jspathstoconcatbeforemodulesjs-%D0%B8-jspathstoconcataftermodulesjs) в конфиге сборщика.

Весь JavaScript-код собирается в один отдельный файл, кроме JavaScript-файлов, которые находятся в директории separate-js. Эти файлы просто переносятся как есть в готовую сборку. Примером такого файла является html5shiv.js

Файлы собираются в следующем порядке:

* static/js/framework (включая подпапки)
* static/js/libraries (включая подпапки)
* static/js/plugins (включая подпапки)
* все файлы, пути к которым находятся в опции jsPathsToConcatBeforeModulesJs
* JavaScript-файлы компонентов
* все файлы, пути к которым находятся в опции jsPathsToConcatAfterModulesJs

**Файлы с _ в начале файла не будут попадать в общую сборку и не буду проверены линтером.**

Проверкой файлов из jsPathsToConcatBeforeModulesJs и jsPathsToConcatAfterModulesJs можно управлять отдельно, опциями lintJsCodeBeforeModules и lintJsCodeAfterModules.
