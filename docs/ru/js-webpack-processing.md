<p align="right">
<a href="../en/js-webpack-processing.md">English description</a> | Описание на русском
</p>

# Работа с JS через webpack

В данной статье не будут раскрыты все особенности webpack, тонкости по его настройке. Для ознакомления с webpack рекомендую изучить [скринкаст Ильи Кантора](https://www.youtube.com/playlist?list=PLDyvV36pndZHfBThhg4Z0822EEG9VGenn). Скринкаст раскрывает множество особенностей при работе с webpack, по его грамотной настройке.

В TARS webpack уже настроен для того, чтобы с ним было достаточно комфортно работать. Но вы можете (и скорее всего вам придется это делать) изменять конфиг, чтобы webpack выполнял именно то, что вам нужно.

По умолчанию используется только одна точка входа: markup/static/js/main.js. Вы можете использовать другой файл и сколь угодоно большое количество точек входа.

По умолчанию webpack умеет разрешать зависмости, объявленные через require, import/export из ESNext. При этом, в любой точке приложения вы можете подключить файл модуля с помощью алиаса «modules». Предположим, что мы находимся в markup/static/main.js и хотим подключить в нем скрипт из модуля «example». Вместо указания относительного пути от main.js до example.js можно написать так:

```js
import foo from 'modules/example/example';
// или
const foo = require('modules/example/example');
```

Также есть алиас для папки static, который позволит подключить файл из папки static в любой точке приложения:

```js
import $ from 'static/js/jquery/jquery';
// или
const $ = require('static/js/jquery/jquery');
```

Для подключения библиотек из node_modules достаточно указать имя пакета:

```js
import $ from 'jquery';
// или
const $ = require('jquery');
```

В webpack уже настроены sourcemaps, которыми вы можете управлять из конфига проекта. Сжатие производится с помощью плагина uglifyJS.

По умолчанию у вас есть возможность использовать переменную окружения NODE_ENV, для использования ее значения в коде. Подробнее можно узнать в [этом ролике Ильи Кантора](https://www.youtube.com/watch?v=5XZqeuWkQ4o&index=6&list=PLDyvV36pndZHfBThhg4Z0822EEG9VGenn).

Вотчинг за изменениями js-файлов также лежит на плечах webpack.

По умолчанию встроена поддежка babel и eslint, которые работают через webpack. eslint использует встроенный парсер для разбора JavaScript-кода, но если вам необходимо поддерживать совсем новые фичи (экспериментальные), вам придется использовать парсер babel-eslint. Подробности можно прочесть в [репозитории проекта](https://github.com/babel/babel-eslint) и [документации eslint](http://eslint.org/docs/user-guide/configuring#specifying-parser-options).

Есть большая просьба: все вопросы по webpack адресовать в google, stackOverflow и т.д. По всем вопросам интеграции TARS и webpack готов ответить.

