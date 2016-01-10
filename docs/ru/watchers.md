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
    return chokidar.watch(/* String of path pattern or array of strings */, {
        ignored: /* String of path pattern or array of strings to ignore. If nothing to igonre — just set it to ''*/,
        persistent: true,
        ignoreInitial: true
    }).on('all', function(event, path) {
        watcherLog(event, path);
        // You could start many tasks
        gulp.start(/* Task name (String) to start */);
    });
```

В chokidar.watch можно передать паттерн или массив паттернов путей до файлов, за которыми нужно следить.

В опцию ignored можно передать паттерн или массив паттернов путей до файлов, которые нужно отфильтровать от слежки в рамках данного вотчера.

В gulp.start передается имя таска, который необходимо запустить при изменениях в файлах, за которыми следит данный вотчер. По умолчанию вотчер срабатывает на все операции с файлами (удаление, создание, переименовывание). Можно изменить это поведение, поменяв .on('all', function(event, path) all на нужное событие. Список доступных событий можно узнать в [документации к chokidar](https://github.com/paulmillr/chokidar#getting-started).
