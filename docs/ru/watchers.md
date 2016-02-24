<p align="right">
<a href="../en/watchers.md">English description</a> | Описание на русском
</p>

# Вотчеры в TARS

Как и таски, вотчеры представляют из себя [commonJS-модуль](http://wiki.commonjs.org/wiki/Modules/1.1). Все вотчеры включаются в gulpfile в корне проекта автоматически.

Свои вотчеры можно создавать в директории user-watchers. По умолчанию там уже находится пример вотчера. Разберем его подробнее.

По умолчанию каждому вотчеру требуется набор модулей для корректной работы:

```javascript
const gulp = tars.packages.gulp;
const gutil = tars.packages.gutil;
const chokidar = tars.packages.chokidar;
const watcherLog = tars.helpers.watcherLog;
```

```javascript
    return chokidar.watch(
        /* String of path pattern or array of strings */,
        Object.assign(tars.options.watch, {
            // Options set bellow will override default from tars.options.watch
            // If you need default options, you can use just tars.options.watch
            ignored: /* String of path pattern or array of strings to ignore. If nothing to igonre — just set it to ''*/,
            persistent: /* Boolean, true by default*/,
            ignoreInitial: /* Boolean, true by default*/
        })
    ).on('all', function(event, path) {
        watcherLog(event, path);
        // You could start as many tasks as you need
        gulp.start(/* Task name (String) to start */);
    });
```

В chokidar.watch можно передать паттерн или массив паттернов путей до файлов, за которыми нужно следить.

После паттернов передаются опции для chokidar. Если вам подходят опции по умолчанию, просто передайте вторым аргументом в chokidar.watch tars.options.watch. Если какие-либо свойства необходимо переопределить, используйте [Object.assign](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/assign). Первым параметром assign принимает то, чем мы будем переопределять, а вторым — что будем переопределять.

В опцию ignored можно передать паттерн или массив паттернов путей до файлов, которые нужно отфильтровать от слежки в рамках данного вотчера.

В gulp.start передается имя таска, который необходимо запустить при изменениях в файлах, за которыми следит данный вотчер. По умолчанию вотчер срабатывает на все операции с файлами (удаление, создание, переименовывание). Можно изменить это поведение, поменяв .on('all', function(event, path) all на нужное событие. Список доступных событий можно узнать в [документации к chokidar](https://github.com/paulmillr/chokidar#getting-started).
