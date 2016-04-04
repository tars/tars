<p align="right">
<a href="../en/js-processing.md">English description</a> | Описание на русском
</p>

# Работа с JS

В TARS поддерживается два подхода в работе с JavaScript-кодом:

* [склеивание всех JavaScript-файлов в один в определенном порядке](js-concat-processing.md);
* [использование webpack, для разрешения зависимостей между файлами (доступно с версии 1.7.0)](js-webpack-processing.md).

В обоих подходах поддерживается проверка кода с помощью eslint. Конфигурация eslint находится в корне проекта: .eslintrc и .eslintignore. Управлять проверкой кода можно с помощью опции [js.lint в конфиге проекта](options.md#lint).

Также в обоих подходах есть возможность обработки JavaScript-кода с помощью [Babel](https://babeljs.io/). Для подключения Babel нужно использовать опцию [useBabel](options.md#usebabel) (по умолчанию выключено). Если вам необходимо исключить какие-либо файлы из обработки Babel, то вы можете добавить в начало названия этих файлов "babel_ignore_" или добавить их в секцию ignore в .babelrc в корне проекта. Все JavaScript-файлы из папок static/framework, static/libraries, static/plugins и static/separate-js находятся в ignore в .babelrc по умолчанию. С остальными опциями конфига Babel можно ознакомится на [официальном сайте](https://babeljs.io/docs/usage/options/). Вам не нужно использовать опции: 'filename', и все оцпии, связанные с sourcemaps. Эти опции уже заданы в самом сборщике.

Sourcemaps вы можете управлять через опцию в [конфиге сборщика](options.md#sourcemaps).
