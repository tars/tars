<p align="right">
<a href="../en/html-processing.md">English description</a> | Описание на русском
</p>

# HTML

В качестве шаблонизатора для HTML можно использовать [Jade](http://jade-lang.com), [Pug](https://pugjs.org/api/getting-started.html) или [Handlebars](http://handlebarsjs.com). Шаблонизатор выбирается в [tars-config.js](options.md#templater) или во время [инициализации TARS с помощью TARS-CLI](https://github.com/tars/tars-cli/blob/master/docs/ru/commands.md#tars-init).

Можно использовать любые средства данных шаблонизаторов. Если вы привыкли к ламповому HTML, то смело выбирайте Handlebars и просто пишите HTML как раньше.

Если не требуется компиляция определенной страницы, то можно просто добавить '_' в начало названия страницы, и она не будет скомпилирована.

Если необходимо подключить файлы из директории static (картинки, js-файлы), то необходимо пользоваться плейсхолдером [%=static=% или \_\_static\_\_](options.md#staticprefix). Тогда подключение картинки в контенте будет выглядеть следующим образом (в примере используется Handlebars):

```html
<img src="%=static=%img/content/example.jpg"/>
```

Для подключения картинки в CSS необходимо использовать тот же плейсхолдер – %=static=% или \_\_static\_\_. Данный плейсхолдер в CSS подставит значение из конфига [staticprefixforcss](options.md#staticprefixforcss).

**Префиксы %=staticPrefixForCss=% и %=staticPrefix=% все еще работают, но крайне не желательно его использовать, так как в будущих версиях он будет удален! Используйте просто %=static=% или \_\_static\_\_! Новый вариант префиксов работает в TARS начиная с версии 1.6.0**

Очень важной фичей является использование различных данных в одном шаблоне. Например, у нас есть компонент head, в котором находится все, что стоит поместить в тег head (различные meta, тайтлы и т.д.) Предположим, что на каждой  странице должен быть свой title. Создавать копии одного и того же компонента, которые отличаются только одной строчкой — не целесообразно. Было бы логично отделить данные от представления.

Поэтому в папке с компонентом есть папка `data`, в которой находится js-файл с данными данного компонента.

Пример данных можно найти в компоненте _template:

```javascript
componentName: {
    dataType: {
        property: value
    }
}
```

Если у вас IDE ругается на синтаксис, то можно использовать обычный JavaScript-объект:

```javascript
data = {
    componentName: {
        dataType: {
            property: value
        }
    }
};
```

Оба синтаксиса поддерживаются TARS по умолчанию.

В файле data.js поддерживаются комментарии только внутри объекта с данными.

С версии TARS 1.8.0 появилась возможность использовать вложенные компоненты. Может получиться такая ситуация, что вложенные компоненты в двух разных компонентах могут иметь одно название и одинаковый ключ в данных. Чтобы такого не происходило TARS генерирует уникальный ключ для вложенных компонентов следующим образом:

```javascript
'parentComponentName_anotherParentComponent_currentComponentName' = {
    dataType: {
        property: value
    }
};
```

При этом в самом вложеном компоненте вы пишете также, как и обычно:

```javascript
const data = {
    'currentComponentName': {
        dataType: {
            property: value
        }
    }
};
```

Все преобразования ключа происходят автоматически.

По умолчанию в данных будут находится данные из компонента _template и список всех страниц проекта в виде:

```javascript
__pages: [
    {
        name: 'pageName',
        href: 'pageHref'
    }
]
```

Этот массив можно использовать для генерации списка ссылок всех страниц проекта.

Также, в шаблон можно передать любые данные с помощью переменной окружения TARS_ENV. Например так можно передать простую строку:

```bash
TARS_ENV="Hello World" tars dev --silent
```

Затем в шаблоне (handlebars):

```handlebars
{{TARS_ENV}}
```

Также можно передавать объекты:

```bash
TARS_ENV="{\"name\": \"Paul\"}" tars dev --silent
```

Затем в шаблоне (handlebars):

```handlebars
{{TARS_ENV.name}}
```

**Обратите внимание, при передаче объекта в переменную окружения необходимо указывать двойные кавычки, а также экранировать их!**


Подключение компонентов с различными данными выглядит по-разному в Jade/Pug и Handlebars.


##Работа с компонентами и данными в Handlebars

Подключение компонента на странице:

```handlebars
{{> componentFolderName/componentName}}
```

Подключение компонента с передачей данных в шаблон:

```handlebars
{{> componentFolderName/componentName componentName.dataType}}
```

Пример подключения компонента head с данными типа defaults:

```handlebars
{{> head/head head.defaults}}
```

Внутри самого компонента данные выводятся средствами Handlebars:

```handlebars
<title>{{title}}</title>
```

Если вы не передали данные в компонент, то компонент получает доступ в глобальный контекст. Иными словами, если мы подключим компонент head без передачи данных, то в самом шаблоне мы можем получить доступ к полю title следующим образом:

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

Если же вы передали контекст с подключением компонента, то доступ к данным других компонентов вы уже не имеете внутри подключенного. Чтобы подключать компоненты внутри других компонентов со своими данными необходимо в компонент-родитель передавать глобальный контекст (не передавать никаких данных при подключении). Тогда вы сможете передать в любой дочерный компонент необходимые данные. Либо можно воспользоваться следующим способом:

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

Таким образом, вы можете получить доступ к данным любого компонента из данных любого компонента простой конструкцией:

```javascript
// component/data/data.js
component: {
    main: {
        title: 'Title of component',
        innerComponentData: function (fullData) {
            // fullData — объект, который содержит все данные проекта
            return fullData.componentName.componentType;
        }
    }
}
```

А если использовать стрелочные функции ES6, то все становится еще проще:

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

Не забудьте, ключ доступа к данным вложенных компонентов будет сгенерирвоан автоматически на основе вложенности в другие компоненты.

Handlebars известен, как очень простой шаблонизатор. Но использовать его в статической верстке в таком виде не очень удобно. Поэтому были добавлены различные хелперы, расширяющие возможности Handlebars.<br/>
Описание хелперов можно прочесть [здесь](handlebars-helpers.md).


## Работа с компонентами и данными в Jade/Pug

При использовании Jade/Pug, каждый компонент — миксин, который подключается в файл страницы. Миксины могут принимать данные, этим и воспользуемся.

Подключение компонента на странице:

```jade
include ../components/componentFolderName/componentName  // В начале шаблона страницы (пример — index.jade|pug)

+componentName()  // Подключение компонента
```

Подключение компонента с передачей данных в шаблон:

```jade
include ../components/componentFolderName/componentName  // В начале шаблона страницы (пример — index.jade|pug)

+componentName(componentName.dataType)  // Подключение компонента
```

Пример подключения компонента head с дефолтными данными:

```jade
include ../components/head/head
+head(head.defaults)
```

В случае использования Pug, вам необходимо указать расширение для подключаемого компонента:

```jade
include ../components/head/head.pug
+head(head.defaults)
```

Внутри самого компонента данные выводятся средствами Jade/Pug (например, компонент head):

```jade
mixin head(data)
    <title>#{data.title}</title>
```

Можно использовать любые средства, доступные в Jade/Pug. Вы можете подключать компоненты с любой сложностью, с любыми данными. Функции в data.js также доступны, как и в примерах для Handlebars.

В TARS есть один встроенный хелпер для Jade/Pug — хелпер `Icon`, который вставляет шаблон для подключения svg-symbol в HTML. Также есть возможность добавлять свои хелперы в файл /tars/user-tasks/html/helpers/jade|pug-helpers. Там же есть пример объявления хелпера. Все хелперы доступны в шаблонах следующим образом:

Для Jade:
```jade
= jadeHelpers.helperName(params)

<!-- Если необходимо вывести не заэскпейпленный HTML -->
!= jadeHelpers.helperName(params)
```

Для Pug:
```jade
= pugHelpers.helperName(params)

<!-- Если необходимо вывести не заэскпейпленный HTML -->
!= pugHelpers.helperName(params)
```
