# HTML


As a template for html can be used [jade](http://jade-lang.com) or [handlebars](http://handlebarsjs.com). You could choose template in [tars-config.js](options.md#templater).

You can use all features of jade and handlebars. If you are used to the regular html, choose the handlebars and write the html as before.

If you do not want to compile a particular page, you can simply add the '_' to the begining of the page name, and it will not be compiled.

If you need to include files from the static directory (images, js), you must use the placeholder [%=staticPrefix=%](options.md#staticprefix). Then including of an image will be as in follow example (in this example handlebars is used):

```html
<img src="%=staticPrefix=%img/content/example.jpg"/>
```

To include image in css you need to use another placeholder – [">%=staticPrefixForCss=%](options.md#staticprefixforcss).

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

Connecting modules with different data looks differently in jade and handlebars.


##Working with modules and data handlebars

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

Handlebars known as a very simple template, logicless. But for using the handlebars in the static markup in such kind not very comfortable. So, different helpers have been added that extend the capabilities of handlebars.<br/>
Helpers description can be found [here](handlebars-helpers.md).


## Working with modules and data in jade

When using jade, each module is a mixin, which is included to a file with the page. Mixin in the jade can receive data.

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

Inside the module data is displayed by the jade (for example, the head module):

```jade
mixin head(data)
   <title>#{data.title}</title>
```

You can use any features that are available in jade.
