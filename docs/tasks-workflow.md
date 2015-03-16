Работа с тасками и вотчерами
============================

TARS – набор gulp-тасков, организованных особым образом. Каждый таск — отдельный файл (кроме основных и вспомогательных тасков внутри gulpfile.js). Все системные таски находятся в `tars/tasks`, разбиты по папкам в зависимости от типа таска.

Все вотчеры для тасков находятся в gulpfile.js Пример вотчера также находится в gulpfile.

Таски в TARS
-------------

Каждый таск представляет из себя <a href="http://wiki.commonjs.org/wiki/Modules/1.1" target="_blank">commonJS-модуль</a>. Все таски включаются в gulpfile в корне проекта.

Свои таски можно создавать в директории user-tasks. По умолчанию там уже находится пример таска. Разберем его подробнее.

По умолчанию каждому таску требуется набор модулей для корректной работы:

```javascript
var gulp = require('gulp');
var gulpif = require('gulp-if');
var notify = require('gulp-notify');
var tarsConfig = require('../../tars-config');
var notifyConfig = tarsConfig.notifyConfig;
var modifyDate = require('../helpers/modifyDateFormatter');
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
    gulpif(notifyConfig.useNotify,
        notify({
            onLast: true, // Use this, if you need notify only after last file will be processed
            sound: notifyConfig.sounds.onSuccess,
            title: notifyConfig.title,
            // You can change text of success message
            message: 'Example task is finished \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
            templateOptions: {
                date: modifyDate.getTimeOfModify()
            }
        })
    )
);
```

Также можно вызвать callback, или вернуть основной поток, если требуется выполнять таски в определенном порядке. Более подробно <a href="http://frontender.info/handling-sync-tasks-with-gulp-js/" target="_blank">здесь</a>.

Также не забываем подключить таск в gulpfile.

```javascript
require('./tars/user-tasks/example-task')();
```

Может показаться, что в некторых местах есть излишний код, есть обращения к файлам, а не потокам. Такие места есть, но это сделано в угоду модульности и легкой расширяемости. На самом деле, на скорость работы сборщика именно эти места не влияют.

Вотчеры в TARS
---------------

Как уже было сказанно выше, все вотчеры описывются внутри gulpfile.js в dev-таске. Вотчер имеет следующую структуру:

```javascript
watcher(
    строка или массив строк с путями или паттернами путей до файлов, за которыми нужно следить,
    строка или массив строк с путями или паттернами путей до файлов, которые нужно отфильтровать или false, если фильтрация не требуется,
    function(filename) {
        gulp.start('example-task');
    });
```

Если вы хотите добавить вотчер, который следит за файлами в статике, то рекомендуется использовать переменные:
* tarsConfig.fs.staticFolderName — для имени папки со статикой
* tarsConfig.fs.imagesFolderName — для имени папки с изображениями