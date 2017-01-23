const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

module.exports = {
	entry: ['whatwg-fetch', './src/client/index.tsx'],
	output: {
		filename: '/bundle.js',
		path: './app/client'
	},
	resolve: {
		modules: ['src/client/', 'node_modules'],
		extensions: ['.js', '.jsx','.ts', '.tsx', ".html", ".css"]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader',
				exclude: /node_modules/,
				options: {
					configFileName: './src/client/tsconfig.json'
				}
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				loader: ExtractTextPlugin.extract({
						loader: 'css-loader'
				})
			}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/client/index.html'
		}),
		new ExtractTextPlugin({
			filename: 'bundle.css'
		}),
		new TsConfigPathsPlugin()
	]
}
