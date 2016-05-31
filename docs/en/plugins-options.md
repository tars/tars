<p align="right">
English description | <a href="../ru/plugins-options.md">Описание на русском</a>
</p>

# Plugins configuration

You can configure nine tenths plugins (gulp-plugins and other) just by using one file — plugins-config.json This feature exists in TARS from version 1.8.0

You can change all options, but it is strongly recommended to not override some options, that is used by TARS to make it works correctly. All that options are described in comments.

plugins-config.json is not just simple json-file. You can use commnets and special expression insert(). You can use it to execute JavaScript code inside json-file. For example, gulp-jade need option basedir, where we can set path to partials. So, we can set it manually and change every time than we decide to change name of components dir. insert() allows us to not do it manually.

```js
"gulp-jade": {
    "pretty": true,
    "basedir": "markup/insert(tars.config.fs.componentsFolderName)"
}
```

In that case insert(tars.config.fs.componentsFolderName) will be replaced with value of fs.componentsFolderName from tars-config.js

So, that code will be interpreted like:
```js
"gulp-jade": {
    "pretty": true,
    "basedir": "markup/components"
}

You can execute any JavaScript code by insert. Some more examples:
```js
"example-plugin": {
    "option": "insert(function() {return 'tars'})"
}
```

insert(function() {return 'tars'}) will be replaced with:
```js
"example-plugin": {
    "option": "tars"
}
```
