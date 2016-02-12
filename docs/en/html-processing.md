<p align="right">
English description | <a href="../ru/html-processing.md">Описание на русском</a>
</p>

# HTML

As a template for HTML can be used [Jade](http://jade-lang.com) or [Handlebars](http://handlebarsjs.com). You can choose template in [tars-config.js](options.md#templater) or [during initialization of TARS via TARS-CLI](https://github.com/tars/tars-cli/blob/master/docs/en/commands.md#tars-init).

You can use all features of Jade and Handlebars. If you are used to the regular HTML, choose the handlebars and write the HTML as before.

If you do not want to compile a particular page, you can simply add the '_' to the begining of the page name, and it will not be compiled.

If you need to include files from the static directory (images, js-files), you must use the placeholder [%=static=% or \_\_static\_\_](options.md#staticprefix). Then including of an image will be as in follow example (in this example Handlebars is used):

```html
<img src="%=static=%img/content/example.jpg"/>
```

To include image in CSS you need to use the same placeholder – %=static=% \_\_static\_\_. This placeholder will be replaced with string from [staticprefixforcss](options.md#staticprefixforcss) from config.

**%=staticPrefixForCss=% and %=staticPrefix=% prefixes work, but this prefixes are depricated! Use just %=static=%! New prefixes work in TARS from version 1.6.0**

Very important feature is the using of different data types in one template. For example, we have a head module, which has all that you should put in the head tag (different meta, titles, etc.). Suppose that every page should have its own title. Make copies of the same module, which differ only in one line is not the best practice. It would be logical to separate data from view.

So, the folder with module has a folder with `data`, which has js-file with data for this module. 
Example of data can be found in the module _template:

```js
moduleName: {
    dataType: {
        property: value
    }
}
```

In case of syntax errors in data-files from your IDE  you can use another syntax, just simple JavaScript-object:

```javascript
data = {
    moduleName: {
        dataType: {
            property: value
        }
    }
};
```

TARS supports both syntaxes by default. 

There will be in full-data data from _template module and a list of all pages of current project in array like this:

```javascript
__pages: [
    {
        name: 'pageName',
        href: 'pageHref'
    }
]
```

You can use this array to render a list of links to all pages of project.

Connecting modules with different data looks differently in Jade and Handlebars.

##Working with modules and data Handlebars

Including module on the page:

```handlebars
{{> moduleFolderName/moduleName}}
```

Including module with data passing to the template:

```handlebars
{{> moduleFolderName/moduleName moduleName.dataType}}
```

Example of including head module with default data:

```handlebars
{{> head/head head.defaults}}
```

Inside the module data is displayed by the handlebars:

```handlebars
<title>{{title}}</title>
```

If you include module without passing data, module gets an access to the global scope. For example, if we include module head without data, we will have to use the follow code to get an access to field "title":

```javascript
// head/data/data.js
head: {
    defaults: {
        title: 'Default title'
    }
}
```

index.html
```handlebars
{{> head/head}}
```

head.html
```handlebars
<title>{{head.defaults.title}}</title>
```

But, if you have passed the data to module, you will not have an access to the data for child module. You have to pass global scope to the parent module (to not pass any data while including), to pass data for child-module. Or you can use another variant:

index.html
```handlebars
{{> module1/module1 module1.main}}
```

module1.html
```handlebars

<h1>{{title}}</h1>

{{> module2/module2 module2.main}}
```

```javascript
// module1/data/data.js
module1: {
    main: {
        title: 'Title of module1',
        module2: function (fullData) {
            return fullData.module2;
        }
    }
}
```

module2.html
```handlebars

<h2>{{title}}</h2>
```

```javascript
// module2/data/data.js
module2: {
    main: {
        title: 'Title of module2'
    }
}
```

So, you can get access to data of any module from data-file of current-module by using really simple construction:

```javascript
// module/data/data.js
module: {
    main: {
        title: 'Title of module',
        innerModuleData: function (fullData) {
            // fullData is an object 
            // with all data of the application
            return fullData.moduleName.ModuleType;
        }
    }
}
```

Everything will be musch more easy with arrow functions ES6:

```javascript
// module/data/data.js
module: {
    main: {
        title: 'Title of module',
        innerModuleData: fullData => fullData.moduleName.ModuleType
        }
    }
}
```

Handlebars known as a very simple template. But it is not comfortable to use Handlebars in markup process without frameworks or something like that. So, different helpers have been added that expand Handlebars.<br/>
Helpers description can be found [here](handlebars-helpers.md).


## Working with modules and data in Jade

When using Jade, each module is a mixin, which is included to a file with the page. Mixin in Jade can receive data.

Including module on the page:

```jade
include ../modules/moduleFolderName/moduleName
+moduleName()  // Module including
```

Including module with data transmission in the template:

```jade
include ../modules/moduleFolderName/moduleName
+moduleName(moduleName.dataType)  // Module including
```

Example of head module including with default data:

```jade
include ../modules/head/head
+head(head.defaults)
```

Inside the module data is displayed by Jade (for example, the head module):

```jade
mixin head(data)
   <title>#{data.title}</title>
```

You can use any features that are available in Jade. You can include modules with any nesting of child-modules and with any data by using inlude and '+'. And you can use functions in data.js like in examples for Handlebars.

There is one built-in helper for Jade in TARS — Icon. This helper genereate template for svg-symbol include. You can add your own helpers to /tars/user-tasks/html/helpers/jade-helpers. There is an example of user-helper. You can use that helpers in template like:

```jade
= jadeHelpers.helperName(params)

<!-- If your helper returns unescaped code -->
!= jadeHelpers.helperName(params)
```
