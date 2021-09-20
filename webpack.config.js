const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
	mode: isProd ? "production" : "development",
	entry: path.resolve(__dirname, "src", "index.tsx"),
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.[hash].js",
	},
	module: {
		rules: [
			{
				test: /\.[jt]sx?$/,
				use: [
					{
						loader: "babel-loader",
					},
				],
				exclude: /node_modules/,
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				use: [
					{
						loader: "file-loader",
					},
				],
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js", ".jsx"],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "./public/index.html"),
		}),
		new CleanWebpackPlugin(),
	],
	devServer: {
		static: {
			directory: path.join(__dirname, "public"),
		},
		port: 3000,
		compress: true,
		hot: true,
		open: true,
	},
};
