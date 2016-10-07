<p align="right">
English description | <a href="../ru/js-webpack-processing.md">Описание на русском</a>
</p>

# JS-processing with webpack

**Please, direct all questions about "how webpack works"/"how to configure webpack" to Google, Stack Overflow and so on!**

If you do not know anything about webpack, please, read [documentation of webpack](http://webpack.github.io/docs/) at first.

Webpack is already configured in TARS for comfortable work. But you can change `webpack.config.js` in the project root as you need.

By default, there is only one entry point: `markup/static/js/main.js`. You can choose another entry point or points. **You have to use function `prepareEntryPoints` to prepare config object with entry points. It is necessary for Hot Module Replacement!**

By default webpack can resolve dependencies, which is required by `require` (`import/export`, if babel is used). You can require JavaScript file of any component in any JavaScript file of your project by using alias `components`. Let's assume, that we are in `markup/static/js/main.js` and we'd like to require JavaScript file from component `example`. You can set relative path, but it is to difficult to calculate the correct path. So we can use alias `components`:

```js
import foo from 'components/example/example'; // useBabel: true
// or
const foo = require('components/example/example');

// Old type will work too
const foo = require('modules/example/example');
```

Also, there is alias for static folder:

```js
import $ from 'static/js/jquery/jquery'; // useBabel: true
// or
const $ = require('static/js/jquery/jquery');
```

If you need to require module from `node_modules`, you should specify package name only:

```js
import $ from 'jquery';  // useBabel: true
// or
const $ = require('jquery');
```

Sourcemaps are already configured and you can [manage them from tars-config](options.md#sourcemaps). Sourcemaps from vendor modules will be added to main sourcemaps by source-map-loader. uglifyJS is used to compress production-ready code.

You can use value of `NODE_ENV` in your code. [webpack.DefinePlugin](http://webpack.github.io/docs/list-of-plugins.html#defineplugin) is used.

Webpack built-in watcher is used for changes in your code.

Also, you can use [Hot module replacement](https://webpack.github.io/docs/hot-module-replacement.html). This feature is implemented with middleware for Browser-sync and plugin [webpack.HotModuleReplacementPlugin](http://webpack.github.io/docs/list-of-plugins.html#hotmodulereplacementplugin).

By defult you can use babel to transpile your ESNext code into ES5. Babel-loader is used. Also, you can lint your code by eslint. Eslint-loader is used for this feature. Eslint uses built-in JavaScript code parser, but if you need to lint ESNext code, you have to use another parser: babel-eslint. So, you have to install it localy and set it in .eslintrc. You can get more info from [babel-eslint repository](https://github.com/babel/babel-eslint) and [documentation for eslint](http://eslint.org/docs/user-guide/configuring#specifying-parser-options).
