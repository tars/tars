# Images

All work with images in TARS can be divided into two parts: "Sprites" and "Individual images."

## Спрайты

TARS supports two formats for a sprite image: PNG, and SVG.

The general approach is described in the [presentation](http://www.slideshare.net/codefest/codefest-2014-2) of web developer [Timofey Chaptykov](https://github.com/Chaptykov).  Approach is briefly described below. The advantage of this approach is disclosed in the presentation and will not be explained below.

There will not be described advantages of concatinating interface (and other small or often repeated images) into a single sprite.  If you don't know what is a sprite you can look details [here](https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D1%80%D0%B0%D0%B9%D1%82_(%D0%BA%D0%BE%D0%BC%D0%BF%D1%8C%D1%8E%D1%82%D0%B5%D1%80%D0%BD%D0%B0%D1%8F_%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D0%BA%D0%B0)).

You may miss the theory and go to the [description of work with sprites](images-processing.md#sprites-including).

Сегодня существует много экранов с высокой плотностью пикселей. Разберёмся, что это значит. В качестве примера рассмотрим смартфоны IPhone 3GS и IPhone 4. У 3GS разрешение экрана 320x480, а у 4-ки — 640x960. Как мы видим, разрешение увеличилось ровно в два раза при той же диагонали, а значит пиксель стал меньше. Чтобы нивелировать эту разницу между размерами пикселей (а ведь именно пикселями мы управляем в CSS) появился параметр device-pixel-ratio (или dppx), который показывает, сколько реальных экранных пикселей содержится в неком логическом пикселе, которым мы оперируем в css. Например, для дисплея IPhone 4 этот параметр равен 2.

Nowadays there are a lot of displays with different pixel density. So, what does it mean? Let's compare IPhone 3GS and IPhone 4. 3GS has 320x480 display resolution and IPhone 4 has 640x960. How can you see, resolution has been changed twice, but diagonal has not been changed. It means, that pixel became smaller. So, there is a parameter device-pixel-ratio (or dppx), which means, how many real pixels there are in one logical pixel. For IPhone 4 dppx = 2.

More details can be found [here](http://stackoverflow.com/questions/21971331/what-is-dots-per-css-inch-and-dots-per-physical-inch) and [here](http://www.w3.org/TR/css3-values/#absolute-lengths).

Suppose we have a sprite of PNG-images. These pictures have a fixed size. If we will blurry this picture on the number of pixels in a 3 times greater than the size of the image, the image will be blurry.

To get rid of this problem, you can use an image is in 3 times larger for such display, and the size of the image in css you must set based on the size of the original image (the property background-size).

At the moment there are screens with dppx from 1 to 4 (and will soon be higher). To prepare sprites for the 4 screen sizes is a lot of work.

SVG helps. SVG is vectorial, it does not depend on dppx screen, it perfectly is rendered in modern (and not only) browsers. You can make only 1 size and this image will look the same on all screens.

Unfortunately SVG has several disadvantages:

* SVG badly displays radial and other complex gradients (linear is displayed excellent).
* Complex shadows are badly displayed.
* Is not displayed in IE8.

Total we have two approaches: SVG for all where we can use it. For the rest prepare of PNG-images for those screens that you are going to support. For IE8 will simply rasterize SVG-image.


## Sprites including

SVG images are concatenated to the SVG-sprite.

SVG-images in the release-version is minified. Images that will be included in such way must be put in a folder (Set default path): 'static/img/svg/'. Nested directories are not supported.

Images that can not be rendered in SVG is added up to 'static/img/sprite/96dpi|192dpi|288dpi|384dpi'. 96dpi folder is for images to screens with dppx = 1, 192dpi folder is for images twice as much of the original, with the names of the originals. These images will be displayed to the screens with dppx = 2. And it's similar for other dppx.

Used screens and SVG-supporting is configured in the configuration of the project.

Including images to css-code is produced by two mixins (example on scss, mixins name and other input parameters for the different css-preprocessors are the same):

```scss
@include bg($png-image-name);         // Sprite with png-images including
@include bg-svg($svg-image-name);     // Sprite with svg-images including
```

png-image-name or svg-image-name — is the name of corresponding image without the extension.

!It is important that when you save the image in SVG there is have to be viewBox attribute! Save SVG as an object that can be inserted into html without changing (in Adobe Illustrator Image location option — Embed).

`bg` mixin will include background into the css, picture size, background-size and sets positioning inside png-sprite. It is not necessary to add nothing more, mixin will set media expression for screens with different dppx. `bg-svg` mixin will include svg-sprite as a background, will set all necessary offsets and sizes into the css.

## Separate images

Working with separate images is very simple. Separate images are divided into several categories. Depending on the category images are placed in different locations.

Builder supports images of any type, but only SVG, PNG, JPG and GIF will be exposed to minification. !All described below is only a recommendation, you can organize the images so as you wish!

### Images for module

They are located in the assets folder inside the module. To include image using the following template (for connecting images to html you must use the placeholder [%=staticPrefixForCss=%](options.md#staticprefixforcss)):

```css
.moduleName {
    background: url('%=staticPrefixForCss=%assets/moduleName/sample-image-name.png') no-repeat;
}
```

Nested directories are supported.

### Images for content

They are on the path (the path by default): 'static/img/content/'. In this folder you should put images that you will use in the content area on the site, for example, on news page. Nested directories it supported.

Including images inside html:

```handlebars
<div class="news__item">
    <img src="%=staticPrefix=%img/content/sample-image-name.jpg" alt="">
</div>
```


### Images for plugins

They are on the path (the path by default): 'static/img/plugins/'. In this folder you should put images that are used in different plugins. Nested directories it supported.

### General images

They are on the way (the path by default): 'static/img/general/'. In this folder you should put images that are used for the whole project, such as the general background of the site. Nested directories it supported.
