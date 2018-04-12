let webpack = require('webpack');
let path = require('path');

module.exports = {
    entry: [
        './src/main'
    ],
    module: {
        loaders: [
            { test: /\.js?$/, loader: 'babel', exclude: /node_modules/ },
            { test: /\.s?css$/, loader: 'style!css!sass' },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js']
    },
    output: {
        path: path.join(__dirname, '/templates'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './templates',
        hot: true
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};