<p align="right">
English description | <a href="../ru/images-processing.md">Описание на русском</a>
</p>

# Images

All work with images in TARS can be divided into two parts: "Sprites" and "Separate images."

## Sprites

TARS supports two formats for a sprite image: PNG, and SVG.

**TARS supports two workflows of working with SVG. You can get more info from [docs about working with SVG](./svg-processing.md)**

The general approach is described in the [presentation](http://www.slideshare.net/codefest/codefest-2014-2) of web developer [Timofey Chaptykov](https://github.com/Chaptykov).  Approach is briefly described below. The advantage of this approach is disclosed in the presentation and will not be explained below.

There will not be described advantages of concatinating interface (and other small or often repeated images) into a single sprite.  If you don't know what is a sprite you can look details [here](https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D1%80%D0%B0%D0%B9%D1%82_(%D0%BA%D0%BE%D0%BC%D0%BF%D1%8C%D1%8E%D1%82%D0%B5%D1%80%D0%BD%D0%B0%D1%8F_%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D0%BA%D0%B0)).

You may miss the theory and go to the [description of work with sprites](images-processing.md#sprites-including).

Nowadays there are a lot of displays with different pixel density. So, what does it mean? Let's compare IPhone 3GS and IPhone 4. 3GS has 320x480 display resolution and IPhone 4 has 640x960. How can you see, resolution has been changed twice, but diagonal has not been changed. It means, that pixel became smaller. So, there is a parameter device-pixel-ratio (or dppx), which means, how many real pixels there are in one logical pixel. For IPhone 4 dppx = 2.

More details can be found [here](http://stackoverflow.com/questions/21971331/what-is-dots-per-css-inch-and-dots-per-physical-inch) and [here](http://www.w3.org/TR/css3-values/#absolute-lengths).

Suppose we have a sprite of PNG-images. These pictures have a fixed size. If we will blurry this picture on the number of pixels in a 3 times greater than the size of the image, the image will be blurry.

To get rid of this problem, you can use an image is in 3 times larger for such display, and the size of the image in CSS you must set based on the size of the original image (the property background-size).

At the moment there are screens with dppx from 1 to 4 (and will soon be higher). To prepare sprites for the 4 screen sizes is a lot of work.

SVG helps. SVG is vectorial, it does not depend on dppx screen, it perfectly is rendered in modern (and not only) browsers. You can make only 1 size and this image will look the same on all screens.

Unfortunately SVG has several disadvantages:

* SVG badly displays radial and other complex gradients (linear is displayed excellent).
* Complex shadows are badly displayed.
* Is not displayed in IE8.

Total we have two approaches: SVG for all where we can use it. For the rest prepare of PNG-images for those screens that you are going to support. For IE8 will simply rasterize SVG-image.

**TARS supports two workflows of working with SVG. You can get more info from [docs about working with SVG](svg-processing.md)**

## Sprites including

Images that can not be rendered in SVG is added up to 'static/img/sprite/96dpi|192dpi|288dpi|384dpi'. 96dpi folder is for images to screens with dppx = 1, 192dpi folder is for images twice as much of the original, with the names of the originals. These images will be displayed to the screens with dppx = 2. And it's similar for other dppx.

Used screens is configured [in the tars-config](options.md#useimagesfordisplaywithdpi).

Including icon from raster-sprite to CSS-code is produced by a mixins (example on SCSS, mixins name and other input parameters for the different CSS-preprocessors are the same):

```scss
@include bg($png-image-name);         // Sprite with png-images including
```

Attention, $png-image-name is a **var**, that has the same name as the icon, which you'd like to use (without extension).

`bg` mixin will include background into the CSS, picture size, background-size and sets positioning inside png-sprite. It is not necessary to add nothing more, mixin will set media expression for screens with different dppx.

## Separate images

Working with separate images is very simple. Separate images are divided into several categories. Depending on the category images are placed in different locations.

Builder supports images of any type, but only SVG, PNG, JPG will be exposed to minification. !All described below is only a recommendation, you can organize the images so as you wish!

### Images for module

They are located in the assets folder inside the module. To include image using the following template (for connecting images to HTML you must use the placeholder [%=static=% or \_\_static\_\_](options.md#staticprefixforcss)):

```css
.moduleName {
    background: url('%=static=%assets/moduleName/sample-image-name.png') no-repeat;
}
```

If you would like to insert images in HTML, you have to use placeholder [%=static=% or \_\_static\_\_](options.md#staticprefix):

```handlebars
<div class="news__item">
    <img src="%=static=%img/assets/moduleName/sample-image-name.png" alt="">
</div>
```


**%=staticPrefixForCss=% and %=staticPrefix=% prefix works, but these prefixes are depricated! Use just %=static=% or \_\_static\_\_! New prefixes work in TARS from version 1.6.0**

Nested directories are supported.

### Images for content

They are on the path (the path by default): 'static/img/content/'. In this folder you should put images that you will use in the content area on the site, for example, on news page. Nested directories are supported.

Including images inside HTML:

```handlebars
<div class="news__item">
    <img src="%=static=%img/content/sample-image-name.jpg" alt="">
</div>
```

**%=staticPrefix=% prefix works, but this prefix is depricated! Use just %=static=% or \_\_static\_\_!**

### Images for plugins

They are on the path (the path by default): 'static/img/plugins/'. In this folder you should put images that are used in different plugins. Nested directories are supported.

### General images

They are on the way (the path by default): 'static/img/general/'. In this folder you should put images that are used for the whole project, such as the general background of the site. Nested directories are supported.
