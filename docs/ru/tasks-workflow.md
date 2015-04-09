# Работа с тасками и вотчерами


TARS – набор gulp-тасков, организованных особым образом. Каждый таск — отдельный файл (кроме составных, таких как build, dev и т.п.). Все системные таски находятся в `tars/tasks`, разбиты по папкам в зависимости от типа таска.

Все вотчеры для тасков находятся в `tars/watchers`.


## Таски в TARS

Каждый таск представляет из себя [commonJS-модуль](http://wiki.commonjs.org/wiki/Modules/1.1). Все таски включаются в gulpfile в корне проекта автоматически.

Свои таски можно создавать в директории user-tasks. По умолчанию там уже находится пример таска. Разберем его подробнее.

По умолчанию каждому таску требуется набор модулей для корректной работы:

```javascript
var gulp = require('gulp');
var notify = require('gulp-notify');
var notifier = require('../helpers/notifier');
var tarsConfig = require('../../tars-config');
```

Также, если требуется использовать livereload для данного таска, подключаем модуль browserSync:

```javascript
var browserSync = require('browser-sync');
```

Если требуются какие-либо еще зависимости, подключаем их тут же. При этом, зависимости, которых нет в основном package.json, можно занести в user-package.json, который находится в корне проекта. Формат такой же, как и у основного package.json Это сделано для того, чтобы при обновлении зависимостей tars командой `gulp update-deps` ваши зависимости не перетирались.

!Не помещайте свои собственные зависимости в package.json. Помещайте их user-package.json!

Далее, если есть зависимости от других тасков, то подключаем их в текущий:

```javascript
require('./ path to task file from current task');
```

Затем идет тело модуля, который будет экспортировать таск. Каждый таск описывается внутри экспортируемой функции, которая получает в качестве параметра конфиг сборки (buildOptions). В конфиге сборки находится хеш (если происходит сборка с ключом `--release`), а также версия текущей сборки, если используется версионирование. Экспортируемая функция возвращает полноценный gulp-таск. Далее делаем все как и с обычным таском для gulp.

Если требуется нотификация, то таск должен оканчиваться следующим образом:

```javascript
// If you need to reload browser, uncomment the row below
// .pipe(browserSync.reload({stream:true}))
.pipe(
    notifier('Example task is finished \n')
);
```

В notifier передается строка, которая будет показываться в уведомлениях.

Также можно вызвать callback, или вернуть основной поток, если требуется выполнять таски в определенном порядке. Более подробно [здесь](http://frontender.info/handling-sync-tasks-with-gulp-js).

Может показаться, что в некторых местах есть излишний код, есть обращения к файлам, а не потокам. Такие места есть, но это сделано в угоду модульности и легкой расширяемости. На самом деле, на скорость работы сборщика именно эти места не влияют.

Вообще, в TARS можно подключить любой gulp-task.


## Вотчеры в TARS

Как и таски, вотчеры представляют из себя [commonJS-модуль](http://wiki.commonjs.org/wiki/Modules/1.1). Все вотчеры включаются в gulpfile в корне проекта автоматически.

Свои вотчеры можно создавать в директории user-watchers. По умолчанию там уже находится пример вотчера. Разберем его подробнее.

По умолчанию каждому вотчеру требуется набор модулей для корректной работы:

```javascript
var gulp = require('gulp');
var gutil = require('gulp-util');
var chokidar = require('chokidar');
var tarsConfig = require('../../tars-config');
var watcherLog = require('../helpers/watcher-log');
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

При добавлении вотчеров рекомендуется использовать переменные:

* tarsConfig.fs.staticFolderName — для имени папки со статикой
* tarsConfig.fs.imagesFolderName — для имени папки с изображениями
* watchOptions.templateExtension – содержит расширение для файлов выбранного шаблонизатора
* watchOptions.cssPreprocExtension – содержит расширение для файлов выбранного css-препроцессора
