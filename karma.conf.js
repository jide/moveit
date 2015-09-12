var webpack = require('webpack');

module.exports = function(config) {
    config.set({
        browsers: ['Chrome'],
        files: [
          'src/**/*.spec.*'
        ],
        frameworks: ['jasmine'],
        reporters: ["spec"],
        preprocessors: {
            'src/**/*.spec.*': ['webpack']
        },
        webpack: {
            module: {
              loaders: [
                {
                  test: /\.js$/,
                  exclude: [/node_modules/],
                  loader: "babel-loader?optional[]=runtime&stage=0"
                }
              ]
            },
            node: {
              fs: 'empty'
            },
            watch: true,
            plugins: [new webpack.SourceMapDevToolPlugin("[file].map")]
        },
        webpackServer: {
            noInfo: true
        }
    });
};
