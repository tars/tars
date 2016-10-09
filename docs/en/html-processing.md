<p align="right">
English description | <a href="../ru/html-processing.md">Описание на русском</a>
</p>

# HTML

[Jade](http://jade-lang.com), [Pug](https://pugjs.org/api/getting-started.html) or [Handlebars](http://handlebarsjs.com) can be used as a html templater. You can choose templater in [tars-config.js](options.md#templater) or [during initialization of TARS via TARS-CLI](https://github.com/tars/tars-cli/blob/master/docs/en/commands.md#tars-init).

You can use all features of Jade, Pug and Handlebars. If you are used to the regular HTML, choose the handlebars and write HTML as before.

If you don't want to compile a particular page, you can simply add the '_' at the begining of the page name and it will not be compiled.

If you need to include files from the static directory (images, js-files), you must use the placeholder [`%=static=%` or `__static__`](options.md#staticprefix). Then including of an image will be as in following example (in this example Handlebars is used):

```html
<img src="%=static=%img/content/example.jpg"/>
```

To include image in CSS you need to use the same placeholder – `%=static=%`. This placeholder will be replaced with string from [staticprefixforcss](options.md#staticprefixforcss) from config.

**%=staticPrefixForCss=% and %=staticPrefix=% prefixes work, but these prefixes are deprecated! Just use %=static=%! New prefixes work in TARS from version 1.6.0**

Very important feature is the usage of different data types in one template. For example, we have a head component, which has all that you should put in the head tag (different meta, titles, etc.). Suppose that every page should have its own title. Making copies of the same component, which differ only in one line is not the best practice. It would be logical to separate data from presentation.

So, the folder with the component has a folder called `data`, which has js file with data for this component.
Example of data can be found in the component _template:

```js
componentName: {
    dataType: {
        property: value
    }
}
```

In case of syntax errors in data files from your editor you can use another syntax, just a simple JavaScript object:

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

In the file `data.js` comments are supported within the data object.

You can add component into another component folder from TARS 1.8.0. In that case there can be some problems with duplicating names of these components. To prevent this situation, TARS generates unique key for each embedded component using the next scheme:

```javascript
'parentComponentName_anotherParentComponent_currentComponentName' = {
    dataType: {
        property: value
    }
};
```

In the embedded component data file you can write code as usual:

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

By default full data will contain the data from `_template` component and a list of all project pages like this:

```javascript
__pages: [
    {
        name: 'pageName',
        href: 'pageHref'
    }
]
```

You can use this array to render a list of links to all pages of a project.

You can pass any data to templater by using env var TARS_ENV. For example, you can pass a simple string:

```bash
TARS_ENV="Hello World" tars dev --silent
```

And then you can get it in template (handlebars):

```handlebars
{{TARS_ENV}}
```

You can pass object to TARS_ENV too:

```bash
TARS_ENV="{\"name\": \"Paul\"}" tars dev --silent
```

And then you can get it in template (handlebars):

```handlebars
{{TARS_ENV.name}}
```

**It is important to add double quotes and escape quotes inside object!**

Connecting components with different data looks differently in Jade/Pug and Handlebars.

## Working with components and data in Handlebars

Including component on the page:

```handlebars
{{> componentFolderName/componentName}}
```

Including component with passing data to the template:

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

If you include component without passing data, component gets an access to the global scope. For example, if we include component `head` without data, we will have to use the following code to get access to the field `title`:

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

But, if you have passed the data to component, you will not have access to the data of a child component. You have to pass global scope to the parent component (to not pass any data while including), to pass data for a child component. Or you can use another variant:

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

So, you can get access to data of any component from data-file of current-component by using really simple construct:

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

Everything will be much more easier with arrow functions ES6:

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

Do not forget, that embeded components will have unique key in the complete data file in the build.

Handlebars is known as a very simple templater. But it is uncomfortable to use Handlebars in creation process without frameworks or something like that. So, different helpers have been added that expand Handlebars.

Helpers description can be found [here](handlebars-helpers.md).


## Working with components and data in Jade/Pug

When using Jade/Pug, each component is a mixin, which is included in a page file. Mixin can receive data.

Including component on the page:

```jade
include ../components/componentFolderName/componentName
+componentName()  // Component include
```

Including component with data transmission in the template:

```jade
include ../components/componentFolderName/componentName
+componentName(componentName.dataType)  // Component include
```

Example of head component including with default data:

```jade
include ../components/head/head
+head(head.defaults)
```

You have to add extension in Pug:

```jade
include ../components/head/head.pug
+head(head.defaults)
```

Inside the component data is displayed by Jade/Pug (for example, the head component):

```jade
mixin head(data)
   <title>#{data.title}</title>
```

You can use any features that are available in Jade/Pug. You can include components with any nesting of child components and with any data by using inlude and '+'. And you can use functions in data.js like in examples for Handlebars.

There is one built-in helper for Jade/Pug in TARS — Icon. This helper generates templates for svg symbol inclusion. You can add your own helpers to `/tars/user-tasks/html/helpers/jade"pug-helpers`. There is an example of user-helper in there. You can use added helpers in a template like:

For Jade:
```jade
= jadeHelpers.helperName(params)

<!-- If your helper returns unescaped code -->
!= jadeHelpers.helperName(params)
```

For Pug:
```jade
= pugHelpers.helperName(params)

<!-- If your helper returns unescaped code -->
!= pugHelpers.helperName(params)
```
