<p align="right">
<a href="../en/html-processing.md">English description</a> | Описание на русском
</p>

# HTML

В качестве шаблонизатора для HTML можно использовать [Jade](http://jade-lang.com) или [Handlebars](http://handlebarsjs.com). Шаблонизатор выбирается в [tars-config.js](options.md#templater) или вов время [инициализации TARS с помощью TARS-CLI](https://github.com/tars/tars-cli/blob/master/docs/ru/commands.md#tars-init).

Можно использовать любые средства данных шаблонизаторов. Если вы привыкли к ламповому HTML, то смело выбирайте Handlebars и просто пишите HTML как раньше.

Если не требуется компиляция определенной страницы, то можно просто добавить '_' в начало названия страницы, и она не будет скомпилирована.

Если необходимо подключить файлы из директории static (картинки, js-файлы), то необходимо пользоваться плейсхолдером [%=static=% или \_\_static\_\_](options.md#staticprefix). Тогда подключение картинки в контенте будет выглядеть следующим образом (в примере используется Handlebars):

```html
<img src="%=static=%img/content/example.jpg"/>
```

Для подключения картинки в CSS необходимо использовать тот же плейсхолдер – %=static=% или \_\_static\_\_. Данный плейсхолдер в CSS подставит значение из конфига [staticprefixforcss](options.md#staticprefixforcss).

**Префиксы %=staticPrefixForCss=% и %=staticPrefix=% все еще работают, но крайне не желательно его использовать, так как в будущих версиях он будет удален! Используйте просто %=static=% или \_\_static\_\_! Новый вариант префиксов работает в TARS начиная с версии 1.6.0**

Очень важной фичей является использование различных данных в одном шаблоне. Например, у нас есть модуль head, в котором находится все, что стоит поместить в тег head (различные meta, тайтлы и т.д.) Предположим, что на каждой  странице должен быть свой title. Создавать копии одного и того же модуля, которые отличаются только одной строчкой — не целесообразно. Было бы логично отделить данные от представления.

Поэтому в папке с модулем есть папка `data`, в которой находится js-файл с данными данного модуля.

Пример данных можно найти в модуле _template:

```javascript
moduleName: {
    dataType: {
        property: value
    }
}
```

Если у вас IDE ругается на синтаксис, то можно использовать обычный JavaScript-объект:

```javascript
data = {
    moduleName: {
        dataType: {
            property: value
        }
    }
};
```

Оба синтаксиса поддерживаются TARS по умолчанию.

По умолчанию в данных будут находится данные из модуля _template и список всех страниц проекта в виде:

```javascript
__pages: [
    {
        name: 'pageName',
        href: 'pageHref'
    }
]
```

Этот массив можно использовать для генерации списка ссылок всех страниц проекта.

Подключение модулей с различными данными выглядит по-разному в Jade и Handlebars.


##Работа с модулями и данными в Handlebars

Подключение модуля на странице:

```handlebars
{{> moduleFolderName/moduleName}}
```

Подключение модуля с передачей данных в шаблон:

```handlebars
{{> moduleFolderName/moduleName moduleName.dataType}}
```

Пример подключения модуля head с данными типа defaults:

```handlebars
{{> head/head head.defaults}}
```

Внутри самого модуля данные выводятся средствами Handlebars:

```handlebars
<title>{{title}}</title>
```

Если вы не передали данные в модуль, то модуль получает доступ в глобальный контекст. Иными словами, если мы подключим модуль head без передачи данных, то в самом шаблоне мы можем получить доступ к полю title следующим образом:

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

Если же вы передали контекст с подключением модуля, то доступ к данным других модулей вы уже не имеете внутри подключенного. Чтобы подключать модули внутри других модулей со своими данными необходимо в модуль-родитель передавать глобальный контекст (не передавать никаких данных при подключении). Тогда вы сможете передать в любой дочерный модуль необходимые данные. Либо можно воспользоваться следующим способом:

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

Таким образом, вы можете получить доступ к данным любого модуля из данных любого модуля простой конструкцией:

```javascript
// module/data/data.js
module: {
    main: {
        title: 'Title of module',
        innerModuleData: function (fullData) {
            // fullData — объект, который содержит все данные проекта
            return fullData.moduleName.ModuleType;
        }
    }
}
```

А если использовать стрелочные функции ES6, то все становится еще проще:

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

Handlebars известен, как очень простой шаблонизатор. Но использовать его в статической верстке в таком виде не очень удобно. Поэтому были добавлены различные хелперы, расширяющие возможности Handlebars.<br/>
Описание хелперов можно прочесть [здесь](handlebars-helpers.md).


## Работа с модулями и данными в Jade

При использовании Jade, каждый модуль — миксин, который подключается в файл страницы. Миксины в Jade могут принимать данные, этим и воспользуемся.

Подключение модуля на странице:

```jade
include ../modules/moduleFolderName/moduleName  // В начале шаблона страницы (пример — index.jade)

+moduleName()  // Подключение модуля
```

Подключение модуля с передачей данных в шаблон:

```jade
include ../modules/moduleFolderName/moduleName  // В начале шаблона страницы (пример — index.jade)

+moduleName(moduleName.dataType)  // Подключение модуля
```

Пример подключения модуля head с дефолтными данными:

```jade
include ../modules/head/head
+head(head.defaults)
```

Внутри самого модуля данные выводятся средствами Jade (например, модуль head):

```jade
mixin head(data)
    <title>#{data.title}</title>
```

Можно использовать любые средства, доступные в Jade. Вы можете подключать модули с любой сложностью, с любыми данными. Функции в data.js также доступны, как и в примерах для Handlebars.

В TARS есть один встроенный хелпер для Jade — хелпер `Icon`, который вставляет шаблон для подключения svg-symbol в HTML. Также есть возможность добавлять свои хелперы в файл /tars/user-tasks/html/helpers/jade-helpers. Там же есть пример объявления хелпера. Все хелперы доступны в шаблонах следующим образом:

```jade
= jadeHelpers.helperName(params)

<!-- Если необходимо вывести не заэскпейпленный HTML -->
!= jadeHelpers.helperName(params)
```
