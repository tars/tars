<p align="right">
English description | <a href="../ru/handlebars-helpers.md">Описание на русском</a>
</p>

# Handlebars-helpers

There are some useful built-in helpers. You can add your own helpers to `/tars/user-tasks/html/helpers/handlebars-helpers`. It is not necessary to register your helpers. You just have to add them to exported object `handlebarsHelpers` as a function. All custom helpers will be available in tempalates automatically. Besides, all custom helpers will be moved automatically after project update via TARS-CLI.

Let's describe built-in helpers.

## repeat

It is used to create a simple loop from 0 to n.

Syntax:

```handlebars
{{#repeat n}}
    Do something
{{/repeat}}
```

n — is a number of repetitions. Number, integer.


## is

It is used to expand the standard `if`. Standart `if` is able to check only if a value exists or not. `is` allows you to use the default behavior of if from JavaScript. The comparison operation is passed as a string as the second argument. The comparison values are passed as a string (or as a value from data) as the first and the third arguments. Following operations are available (all operations are performed in JavaScript, respectively, and the comparison result is obtained in the same way as if it were inside JavaScript):

* `==` not strict equality;
* `===` strict equality;
* `>` strict greater;
* `>=` greater or equal;
* `<` strict less;
* `<=` less or equal;
* `!=` not strict inequality;
* `!==` strict inequality.

`test` is the variable passed to the template.

```js
testComponent: {
    test: 10
}
```

Syntax:

```handlebars
{{#is test '>' 9}}
    true
{{else}}
    false
{{/is}}
```


## strip

It cuts all spaces from the passed content.

Syntax:

```handlebars
<style>
    ul li {
        display: inline-block;
    }
</style>

{{#strip}}
    <ul>
        <li>qwe</li>
        <li>asd</li>
    </ul>
{{/strip}}
```

Result:

```html
<ul><li>qwe</li><li>asd</li></ul>
```


## toLowerCase

Transform passed string to lowercase.

Syntax:

```handlebars
{{toLowerCase 'string'}}
```


## toUpperCase

Transform passed string to uppercase.

Syntax:

```handlebars
{{toUpperCase 'string'}}
```


## capitalizeFirst

Transform of the first character of passed string to uppercase.

Syntax:

```handlebars
{{capitalizeFirst 'string'}}
```

## formatDate, now, i18n

Additional helpers. Docs are [here](https://github.com/assemble/handlebars-helpers)
