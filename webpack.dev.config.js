const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { spawn } = require('child_process');

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = path.resolve(__dirname, 'src');

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
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
                    'style-loader',
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
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    entry: [
        'react-hot-loader/patch',
        path.join(__dirname, 'src/index.js')
    ],
    output: {
        publicPath: `http://localhost:9000/`,
        filename: 'bundle.js'
    },
    devtool: 'cheap-source-map',
    devServer: {
        publicPath: `http://localhost:9000/`,
        contentBase: path.resolve(__dirname, 'dist'),
        port: 9000,
        hot: true,
        historyApiFallback: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        stats: {
            colors: true,
            chunks: false,
            children: false
        },
      watchOptions: {
        aggregateTimeout: 1000,
        poll: 1000
      },
        before() {
            spawn(
                'electron',
                ['.'],
                { shell: true, env: process.env, stdio: 'inherit' }
            )
                .on('close', code => process.exit(0))
                .on('error', spawnError => console.error(spawnError));
        }
    }
};
