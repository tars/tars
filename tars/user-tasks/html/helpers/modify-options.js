// All options from here will override default params,
// which are set in modify-html task and in minify and prettify packages.
module.exports = {

    // All options are taken from https://github.com/kangax/html-minifier with default values
    minifyOpts: {

    },

    /* eslint-disable camelcase */

    // You can set any options here for html-prettify
    // That options will override default params for html-minify
    //
    // Supported options:
    //
    // @param {Boolean} indent_inner_html       indent <head> and <body> sections. Default: true
    // @param {Number}  indent_size             indentation size, default: 4
    // @param {String}  indent_char             character to indent with, default: ' '
    // @param {Number}  wrap_line_length        maximum amount of characters per line (0 = disable). Default: 250
    // @param {String}  brace_style             'collapse' | 'expand' | 'end-expand'
    //                                          put braces on the same line as control statements (default),
    //                                          or put braces on own line (Allman / ANSI style),
    //                                          or just put end braces on own line. Default: 'collapse'
    // @param {Array}   unformatted             list of tags, that shouldn't be reformatted,
    //                                          defaults to inline tags. Default: all inline tags.
    // @param {String}  indent_scripts          'keep' | 'separate' | 'normal'. Default: normal.
    // @param {Boolean} preserve_newlines       whether existing line breaks before elements should be preserved
    //                                          Only works before elements, not inside tags or for text.
    //                                          Default: true.
    // @param {Number}  max_preserve_newlines   maximum number of line breaks to be preserved in one chunk
    //                                          Default: unlimited
    // @param {Boolean} indent_handlebars       format and indent {{#foo}} and {{/foo}}. Default: false
    prettifyOpts: {

    }

    /* eslint-enable camelcase */
};
