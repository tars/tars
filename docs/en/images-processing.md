<p align="right">
English description | <a href="../ru/images-processing.md">Описание на русском</a>
</p>

# Images

All work with images in TARS can be divided into two parts: "Sprites" and "Separate images".

## Sprites

TARS supports two formats for a sprite image: PNG and SVG.

**TARS supports two workflows of working with SVG. You can get more info from [docs about working with SVG](./svg-processing.md)**

The general approach is described in the [presentation](http://www.slideshare.net/codefest/codefest-2014-2) of web developer [Timofey Chaptykov](https://github.com/Chaptykov).  Approach is briefly described below. The advantage of this approach is explained in the presentation and will not be explained here.

Advantages of concatinating interface (and other small or often repeated images) into a single sprite will not be described here. If you don't know what a sprite is, you can look up the details [here](https://en.wikipedia.org/wiki/Sprite_(computer_graphics)).

You may skip the theory and go to the [description of the work with sprites](#sprites-inclusion).

Nowadays there are a lot of displays with different pixel density. So, what does it mean? Let's compare iPhone 3GS and iPhone 4. 3GS has 320x480 display resolution and iPhone 4 has 640x960. How can you see, resolution has doubled, but diagonal is the same. It means, that pixel became smaller. So, there is a parameter device-pixel-ratio (or dppx) which means, how many real pixels there are in one logical pixel. For iPhone 4 dppx is 2.

More details can be found [here](http://stackoverflow.com/questions/21971331/what-is-dots-per-css-inch-and-dots-per-physical-inch) and [here](http://www.w3.org/TR/css3-values/#absolute-lengths).

Suppose we have a sprite of PNG images. These pictures have a fixed size. If we will stretch this image on the number of pixels 3 times the size of the image, the image will be blurry.

To get rid of this problem, you can use an image 3 times larger for such display, and the size of the image in CSS must be set basing on the size of the original image (the property background-size).

At the moment there are screens with dppx from 1 to 4 (and soon will be higher). To prepare sprites for the 4 screen sizes is a lot of work.

SVG helps. SVG is vector, it does not depend on dppx of the screen, it is rendered perfectly in modern (and not so) browsers. You can make only 1 size and this image will look the same on all screens.

Unfortunately SVG has several disadvantages:

* SVG badly displays radial and other complex gradients (linear is displayed excellently).
* Complex shadows are badly displayed.
* Is not displayed in IE8.

So we have to combine two approaches: SVG everywhere we can use it. For the rest -  prepare PNG images for those screens that you are going to support. For IE8 we will simply rasterize SVG images.

**TARS supports two workflows of working with SVG. You can get more info from [docs about working with SVG](svg-processing.md)**

## Sprites inclusion

Images that can not be rendered in SVG are copied to 'static/img/sprite/96dpi|192dpi|288dpi|384dpi'. 96dpi folder is for images for screens with dppx = 1, 192dpi folder is for images twice as large as the original, with the names of the originals. These images will be displayed on the screens with dppx = 2. And it's similar for other dppx.

Used screens are configured [in the tars-config](options.md#useimagesfordisplaywithdpi).

Including icon from raster sprite to CSS code is achieved by a mixins (example on SCSS, mixins name and other input parameters for different CSS-preprocessors are the same):

```scss
@include bg($png-image-name);         // Sprite with png-images inclusion
```

Attention, $png-image-name is a **variable**, that has the same name as the icon, which you'd like to use (without extension).

`bg` mixin will include background into the CSS, picture size, background-size and sets positioning inside png sprite. It is not necessary to add nothing more, mixin will set media expression for screens with different dppx.

## Separate images

Working with separate images is very simple. Separate images are divided into several categories. Depending on the category images are placed in different locations.

Builder supports images of any type, but only SVG, PNG, JPG will be exposed to minification. _Anything described below is just a recommendation, you can structure image storage however you like._

### Images for component

They are located in the assets folder inside the component. To include image using the following template (to connect images to HTML you must use the placeholder [`%=static=% `](options.md#staticprefixforcss)):

```css
.componentName {
    background: url('%=static=%assets/componentName/sample-image-name.png') no-repeat;
}
```

If you would like to insert images in HTML, you have to use the placeholder [`%=static=%`](options.md#staticprefix):

```handlebars
<div class="news__item">
    <img src="%=static=%img/assets/componentName/sample-image-name.png" alt="">
</div>
```


**%=staticPrefixForCss=% and %=staticPrefix=% prefix works, but these prefixes are deprecated! Use just `%=static=%`! New prefix works in TARS from version 1.6.0**

Nested directories are supported.

### Images for content

They are in the folder (by default): `static/img/content/`. You should put images that you will use in the content area on the site into this folder, for example, on the news page. Nested directories are supported.

Including images inside HTML:

```handlebars
<div class="news__item">
    <img src="%=static=%img/content/sample-image-name.jpg" alt="">
</div>
```

**%=staticPrefix=% prefix works, but this prefix is depricated! Use just `%=static=%`!**

### Images for plugins

They are in the folder (by default): `static/img/plugins/`. In this folder you should put images that are used in different plugins. Nested directories are supported.

### General images

They are in the folder (by default): `static/img/general/`. In this folder you should put images that are used for the whole project, such as the general background of the site. Nested directories are supported.
