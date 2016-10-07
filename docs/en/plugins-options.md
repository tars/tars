<p align="right">
English description | <a href="../ru/plugins-options.md">Описание на русском</a>
</p>

# Plugins configuration

Since TARS 1.8.0 you can configure most plugins (gulp plugins and more) in a separate file `plugins-config.json` in the project root. Before you had to override task using the plugin or even modify the builder files.

You can change all options, but it is **strongly recommended** to leave some options as default, because TARS depends on them to function correctly. All such options are described in comments in `plugins-config.json`.

`plugins-config.json` is not just a simple json file. You can use commnets and special expression insert(). You can use it to execute JavaScript code inside this json file. For example, `gulp-jade` need option `basedir`, where we can set path to partials. So, we can set it manually and change every time than we decide to change name of components dir. insert() allows us to do it automatically.

```js
"gulp-jade": {
    "pretty": true,
    "basedir": "markup/insert(tars.config.fs.componentsFolderName)"
}
```

In that case `insert(tars.config.fs.componentsFolderName)` will be replaced with value of `fs.componentsFolderName` from `tars-config.js`.

So, that code will be interpreted like:
```js
"gulp-jade": {
    "pretty": true,
    "basedir": "markup/components"
}
```

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
