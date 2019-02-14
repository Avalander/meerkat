const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const examples = path.resolve(__dirname, 'examples')


module.exports = {
	mode: 'development',
	entry: {
		counter: path.join(examples, 'counter.js'),
		cat: path.join(examples, 'cat.js'),
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js',
	},
	module: {
		rules: [{
			test: /\.js/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [[ '@babel/env', {
						targets: {
							firefox: 60,
						},
					}]],
					plugins: [
						['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
					],
				},
			}
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(examples, 'counter.html'),
			filename: 'counter.html',
			chunks: [ 'counter' ],
		}),
		new HtmlWebpackPlugin({
			template: path.join(examples, 'cat.html'),
			filename: 'cat.html',
			chunks: [ 'cat' ],
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.SourceMapDevToolPlugin({}),
	],
	resolve: {
		alias: {
			Meerkat: path.resolve(__dirname, 'src'),
		},
	},
	devServer: {
		compress: true,
		contentBase: path.join(examples, 'public'),
		hot: true,
		stats: 'minimal',
	},
}
