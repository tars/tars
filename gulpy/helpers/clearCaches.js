// Clear caches for gulp-cache plugin
module.exports = function(cache) {
    delete cache.caches['linting', 'move-assets', 'move-content-img', 'move-plugins-img', 'move-fonts', 'move-svg', 'raster-svg', 'separate-js'];
};