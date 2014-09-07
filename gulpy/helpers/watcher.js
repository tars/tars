var     minimatch = require('minimatch'),           // Service module for node-watch
        watch = require('node-watch');              // Watcher

// Watcher by node-watch
var watchByPattern = (function() {
    var parsePattern = function(input) {
        var current = './',
        segments = input.split(/\*/);
        return {
            dir: (/^\*/.test(input) ? current : (segments[0] || current)),
            pat: ('*' + segments.slice(1).join('*'))
        }
    }
  
    var watchStack = {}
  
    return function(pattern, fn) {
        var input = parsePattern(pattern),
        stack = { pat: input.pat, callback: fn };
    
        if (watchStack[input.dir]) {
            watchStack[input.dir].push(stack);
        } else {
            watchStack[input.dir] = [stack];
            watch(input.dir, function(filename) {
                watchStack[input.dir].forEach(function(stack) {
                    if (minimatch(filename, stack.pat)) {
                        stack.callback(filename);
                    }
                });
            });
        }
    }
}());

module.exports = watchByPattern;