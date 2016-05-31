<p align="right">
<a href="../en/js-webpack-processing.md">English description</a> | Описание на русском
</p>

# Работа с JS через webpack

**Есть большая просьба: все вопросы по настройке/работе с webpack адресовать в Google, Stack Overflow и т.д.**

Для ознакомления с webpack рекомендую изучить [скринкаст Ильи Кантора](https://www.youtube.com/playlist?list=PLDyvV36pndZHfBThhg4Z0822EEG9VGenn) и [документацию по webpack](http://webpack.github.io/docs/). Скринкаст раскрывает множество особенностей при работе с webpack и его грамотной настройке.

В TARS webpack уже настроен для того, чтобы с ним было достаточно комфортно работать. Но вы можете (и скорее всего вам придется это делать) изменять webpack-конфиг (файл webpack.config.js в корне проекта), чтобы webpack выполнял именно то, что вам нужно.

По умолчанию используется только одна точка входа: markup/static/js/main.js. Вы можете использовать другой файл и сколь угодоно большое количество точек входа. **Необходимо использовать функцию prepareEntryPoints, в которую будет передаваться объект с информацией о точках входа. Это необходимо для корректной работы Hot Module Replacement!**

По умолчанию webpack умеет разрешать зависмости, объявленные через require (import/export, если включена обработка кода через babel). При этом, в любой точке приложения вы можете подключить файл компонента с помощью алиаса «components». Предположим, что мы находимся в markup/static/js/main.js и хотим подключить в нем скрипт из компонента «example». Вместо указания относительного пути от main.js до example.js можно написать так:

```js
import foo from 'components/example/example'; // useBabel: true
// или
const foo = require('components/example/example');

// Доступен и прошлый вариант
const foo = require('modules/example/example');
```

Также есть алиас для папки static, который позволит подключить файл из папки static в любой точке приложения:

```js
import $ from 'static/js/jquery/jquery'; // useBabel: true
// или
const $ = require('static/js/jquery/jquery');
```

Для подключения библиотек из node_modules достаточно указать имя пакета:

```js
import $ from 'jquery';  // useBabel: true
// или
const $ = require('jquery');
```

В webpack уже настроены sourcemaps, которыми вы можете [управлять из конфига проекта](options.md#sourcemaps). Sourcemaps сторонних плагинов и библиотек будут добавлены к обещму sourcemap (реализовано с помощью source-map-loader). Сжатие производится с помощью плагина uglifyJS.

По умолчанию у вас есть возможность использовать переменную окружения NODE_ENV в коде. Подробнее можно узнать в [этом ролике Ильи Кантора](https://www.youtube.com/watch?v=5XZqeuWkQ4o&index=6&list=PLDyvV36pndZHfBThhg4Z0822EEG9VGenn). Используется плагин webpack.DefinePlugin.

Вотчинг за изменениями JavaScript-файлов также лежит на плечах webpack.

Также доступна горячая замена компонентов ([Hot module replacement](https://webpack.github.io/docs/hot-module-replacement.html)). На русском можно прочитать об этом на [habr'е](https://habrahabr.ru/company/Voximplant/blog/270593/) и посмотреть [ролики из скринкаста Ильи Кантора](https://www.youtube.com/watch?v=EQhXtTOxpVk&list=PLDyvV36pndZHfBThhg4Z0822EEG9VGenn&index=40). Данная возможность [опциональна](options.md#usehmr), реализована с помощью middleware для Browser-sync и плагина webpack.HotModuleReplacementPlugin.

По умолчанию встроена поддежка babel (babel-loader) и eslint (eslint-loader), которые работают через webpack. Eslint использует встроенный парсер для разбора JavaScript-кода, но если вам необходимо поддерживать совсем новые фичи (экспериментальные), вам придется использовать парсер babel-eslint. Подробности можно прочесть в [репозитории проекта](https://github.com/babel/babel-eslint) и [документации eslint](http://eslint.org/docs/user-guide/configuring#specifying-parser-options).

