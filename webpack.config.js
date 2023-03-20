const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = ({ mode } = { mode: "development" }) => {
    console.log(`mode is: ${mode}`);

    return {
        mode,
        entry: "./src/index.js",
        output: {
            publicPath: "/",
            path: path.resolve(__dirname, "build"),
            filename: "bundled.js"
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html"
            }),
        ],
        devServer: {
            headers:{
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers": "*"
            }
        },
    }
};