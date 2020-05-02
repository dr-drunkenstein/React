const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const path = require('path')

exports.devServer = ({ host, port } = {}) => ({
    devServer: {
        stats: "errors-only",
        host,
        port,
        open: true,
        // overlay: true,
    },
    plugins: [new ErrorOverlayPlugin()],
    devtool: 'cheap-module-source-map'
});

exports.loadJavaScript = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude,
                use: "babel-loader",
            },
        ],
    },
});
