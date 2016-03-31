'use strict';

const path = require('path');
const cwd = process.cwd();
const webpack = tars.require('webpack');

const staticFolderName = tars.config.fs.staticFolderName;
const compressJs = tars.flags.release || tars.flags.min;
const generateSourceMaps = tars.config.sourcemaps.js.active && tars.isDevMode;
const sourceMapsDest = tars.config.sourcemaps.js.inline ? 'inline-' : '';
const sourceMapsType = `#${sourceMapsDest}source-map`;

let outputFileNameTemplate = '[name]';
let modulesDirectories = ['node_modules'];
let preLoaders = [];
let loaders = [];

let plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
    })
];

if (process.env.npmRoot) {
    modulesDirectories.push(process.env.npmRoot);
}

if (compressJs) {
    outputFileNameTemplate += `${tars.options.build.hash}.min`;
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                /* eslint-disable camelcase */
                drop_console: tars.config.js.removeConsoleLog,
                drop_debugger: tars.config.js.removeConsoleLog
                /* eslint-enable camelcase */
            },
            mangle: false
        }),
        new webpack.optimize.DedupePlugin()
    );
}

if (tars.options.watch.isActive) {
    plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
}

if (tars.config.js.lint) {
    preLoaders.push(
        {
            test: /\.js$/,
            loader: 'eslint-loader',
            include: `${cwd}/markup`
        }
    );
}

if (tars.config.js.useBabel) {
    loaders.push(
        {
            test: /\.js$/,
            loader: 'babel',
            include: /markup/
        }
    );
}

module.exports = {
    entry: {
        main: path.resolve(`${cwd}/markup/${staticFolderName}/js/main.js`)
    },

    output: {
        path: path.resolve(`${cwd}/dev/${staticFolderName}/js`),
        publicPath: `./${staticFolderName}/js/`,
        filename: `${outputFileNameTemplate}.js`
    },

    watch: tars.options.watch.isActive,

    devtool: generateSourceMaps ? sourceMapsType : null,

    module: {
        preLoaders,
        loaders
    },

    plugins,

    resolveLoader: {
        modulesDirectories
    },

    resolve: {
        alias: {
            modules: path.resolve('./markup/modules'),
            static: path.resolve('./markup/' + staticFolderName)
        }
    },

    eslint: {
        configFile: `${cwd}/.eslintrc`
    }
};
