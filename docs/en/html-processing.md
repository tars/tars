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

Very important feature is the using of different data types in one template. For example, we have a head component, which has all that you should put in the head tag (different meta, titles, etc.). Suppose that every page should have its own title. Make copies of the same component, which differ only in one line is not the best practice. It would be logical to separate data from view.

So, the folder with component has a folder with `data`, which has js-file with data for this component. 
Example of data can be found in the component _template:

```js
componentName: {
    dataType: {
        property: value
    }
}
```

In case of syntax errors in data-files from your IDE  you can use another syntax, just simple JavaScript-object:

```javascript
data = {
    componentName: {
        dataType: {
            property: value
        }
    }
};
```

TARS supports both syntaxes by default.

In file data.js supported comments within the data object.

You can add component into another component folder from TARS 1.8.0. In that case there can be some problems with dublicate names of that components. To prevent this situation, TARS genereate uniq key for each embeded component by the next scheme:

```javascript
'parentComponentName_anotherParentComponent_currentComponentName' = {
    dataType: {
        property: value
    }
};
```

In the embeded component data-file you can write usual code:

```javascript
const data = {
    'currentComponentName': {
        dataType: {
            property: value
        }
    }
};
```

Unique key will be generated automatically.

There will be in full-data data from _template component and a list of all pages of current project in array like this:

```javascript
__pages: [
    {
        name: 'pageName',
        href: 'pageHref'
    }
]
```

You can use this array to render a list of links to all pages of project.

Connecting components with different data looks differently in Jade and Handlebars.

## Working with components and data Handlebars

Including component on the page:

```handlebars
{{> componentFolderName/componentName}}
```

Including component with data passing to the template:

```handlebars
{{> componentFolderName/componentName componentName.dataType}}
```

Example of including head component with default data:

```handlebars
{{> head/head head.defaults}}
```

Inside the component data is displayed by the handlebars:

```handlebars
<title>{{title}}</title>
```

If you include component without passing data, component gets an access to the global scope. For example, if we include component head without data, we will have to use the follow code to get an access to field "title":

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

But, if you have passed the data to component, you will not have an access to the data for child component. You have to pass global scope to the parent component (to not pass any data while including), to pass data for child-component. Or you can use another variant:

index.html
```handlebars
{{> component1/component1 component1.main}}
```

component1.html
```handlebars

<h1>{{title}}</h1>

{{> component2/component2 component2.main}}
```

```javascript
// component1/data/data.js
component1: {
    main: {
        title: 'Title of component1',
        component2: function (fullData) {
            return fullData.component2;
        }
    }
}
```

component2.html
```handlebars

<h2>{{title}}</h2>
```

```javascript
// component2/data/data.js
component2: {
    main: {
        title: 'Title of component2'
    }
}
```

So, you can get access to data of any component from data-file of current-component by using really simple construction:

```javascript
// component/data/data.js
component: {
    main: {
        title: 'Title of component',
        innerComponentData: function (fullData) {
            // fullData is an object 
            // with all data of the application
            return fullData.componentName.componentType;
        }
    }
}
```

Everything will be musch more easy with arrow functions ES6:

```javascript
// component/data/data.js
component: {
    main: {
        title: 'Title of component',
        innerComponentData: fullData => fullData.componentName.componentType
        }
    }
}
```

Do not forget, that embeded components will have uniq key in ready data-file in build.

Handlebars known as a very simple template. But it is not comfortable to use Handlebars in markup process without frameworks or something like that. So, different helpers have been added that expand Handlebars.<br/>
Helpers description can be found [here](handlebars-helpers.md).


## Working with components and data in Jade

When using Jade, each component is a mixin, which is included to a file with the page. Mixin in Jade can receive data.

Including component on the page:

```jade
include ../components/componentFolderName/componentName
+componentName()  // Component including
```

Including component with data transmission in the template:

```jade
include ../components/componentFolderName/componentName
+componentName(componentName.dataType)  // Component including
```

Example of head component including with default data:

```jade
include ../components/head/head
+head(head.defaults)
```

Inside the component data is displayed by Jade (for example, the head component):

```jade
mixin head(data)
   <title>#{data.title}</title>
```

You can use any features that are available in Jade. You can include components with any nesting of child-components and with any data by using inlude and '+'. And you can use functions in data.js like in examples for Handlebars.

There is one built-in helper for Jade in TARS — Icon. This helper genereate template for svg-symbol include. You can add your own helpers to /tars/user-tasks/html/helpers/jade-helpers. There is an example of user-helper. You can use that helpers in template like:

```jade
= jadeHelpers.helperName(params)

<!-- If your helper returns unescaped code -->
!= jadeHelpers.helperName(params)
```
