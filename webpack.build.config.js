const webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    BabiliPlugin = require('babili-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = path.resolve(__dirname, 'src');

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
                        }
                    }, 'postcss-loader'],
                include: [
                    path.resolve(__dirname, 'src/components'),
                    path.resolve(__dirname, 'src/assets'),
                    path.resolve(__dirname, 'src/pages')
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ],
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'node_modules')
                ],
                exclude: [
                    path.resolve(__dirname, 'src/components'),
                    path.resolve(__dirname, 'src/assets'),
                    path.resolve(__dirname, 'src/pages')
                ]
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: defaultInclude
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [{ loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]' }],
                include: defaultInclude
            },
            {
                test: /\.(ttf|eot|otf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: '[name]___[hash:base64:6].[ext]'
                }
            }
        ]
    },
    target: 'electron-renderer',
    plugins: [
        new HtmlWebpackPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'bundle.css',
            chunkFilename: '[id].css'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new BabiliPlugin()
    ],
    stats: {
        colors: true,
        children: false,
        chunks: false,
        modules: false
    }
};
