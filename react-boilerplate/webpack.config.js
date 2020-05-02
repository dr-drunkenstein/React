const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const parts = require("./webpack.parts");

const commonConfig = merge([

    {
        context: path.resolve(__dirname, 'src'),
        resolve: {
            alias: {
                Styles: path.resolve(__dirname, 'src/styles/')
            },
            extensions: ['.js', '.json', '.css', '.scss', '.png', '.jpg', '.svg', '.sass']
        },
        entry: {
            main: './index.js'
        },
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src/index.html')
            }),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
            })
        ],
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
                }
            ]
        }
    }

])

const productionConfig = merge([
]);
const developmentConfig = merge([
    parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT,
    }),
    parts.loadJavaScript()
]);

module.exports = mode => {
    if (mode === "production") {
        return merge(commonConfig, productionConfig, { mode });
    }

    return merge(commonConfig, developmentConfig, { mode });
};