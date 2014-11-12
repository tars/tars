var minimatch = require('minimatch');
var watch = require('node-watch');
var gutil = require('gulp-util');

/**
 * Watcher by node-watch
 */
var watchByPattern = (function() {

    var watchStack = {};

    /**
     * Parse pattern. Extract path, extensions and etc from pattern
     * @param  {string} input  watch path pattern
     * @param  {string} filter unwatch path pattern
     * @return {object}        directory, pattern and unwatch paths
     */
    var parsePattern = function(input, filter) {
        var current = './',
            filterSegment = '',
            segments = input.split(/\*/),
            dir = '',
            pat = '',
            filterPattern = '';

            if (/^\*/.test(input)) {
                dir = current
            } else {
                dir = segments[0] || current;
            }

            pat = '*' + segments.slice(1).join('*');
            filterPattern = filter || false;

            if (filterPattern) {

                if (filterPattern instanceof Array) {
                    for (var i = 0; i < filterPattern.length; i++ ) {
                        filterSegment = filterPattern[i].split(/\*/);
                        filterPattern[i] = '*' + filterSegment.slice(1).join('*');
                    }
                } else {
                    filterSegment = filter.split(/\*/);
                    filterPattern = '*' + filterSegment.slice(1).join('*');
                }
            }

        return {
            dir: dir,
            pat: pat,
            filter: filterPattern
        }
    };

    /**
     * Create watcher for each path pattern
     * @param  {string} pattern  watch path pattern
     * @param  {string} filter   unwatch path pattern
     * @param  {Function} fn     callback on each path pattern
     */
    var patternProcessing = function(pattern, filter, fn) {

        var input = parsePattern(pattern, filter),
            stack = { pat: input.pat, callback: fn, filter: input.filter };

        if (watchStack[input.dir]) {
            watchStack[input.dir].push(stack);
        } else {
            watchStack[input.dir] = [stack];
            watch(input.dir, function(filename) {
                watchStack[input.dir].forEach(function(stack) {
                    var useFilter = false;
                    if (minimatch(filename, stack.pat)) {
                        gutil.log('File was changed: ', gutil.colors.cyan(filename));

                        if (stack.filter) {
                            if (stack.filter instanceof Array) {
                                stack.filter.forEach(function(filterItem) {
                                    if (minimatch(filename, filterItem)) {
                                        useFilter = true;
                                    }
                                });

                                if (useFilter) {
                                    return;
                                } else {
                                    stack.callback(filename);
                                }
                            } else {
                                if (minimatch(filename, stack.filter)) {
                                    return;
                                } else {
                                    stack.callback(filename);
                                }
                            }

                        } else {
                            stack.callback(filename);
                        }
                    }
                });
            });
        }
    };

    return function(pattern, filter, fn) {

        if (pattern instanceof Array) {
            pattern.forEach(function(patternItem) {
                patternProcessing(patternItem, filter, fn);
            });
        } else {
            patternProcessing(pattern, filter, fn);
        }
    }
}());

module.exports = watchByPattern;