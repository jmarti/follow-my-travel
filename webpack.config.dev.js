var webpack = require('webpack');
var path = require('path');

module.exports = {
	devtool: '#eval-source-map',

	entry: [
		'webpack-hot-middleware/client',
		'./src/main'
	],

	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/admin'
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'vendor',
		// 	minChunks: Infinity,
		// 	filename: 'vendor.js',
		// }),
		// new webpack.DefinePlugin({
		// 	'process.env': {
		// 		CLIENT: JSON.stringify(true),
		// 		'NODE_ENV': JSON.stringify('development'),
		// 	}
		// }),
	],

	resolve: {
		extensions: ['.js'],
		alias: {
			request: 'browser-request'
		}
	},

	module: {
		loaders: [
			{
				test: /\.js*$/,
				loader: 'babel-loader',
				include: path.join(__dirname, 'src'),
				query: {
					"env": {
						"development": {
							"presets": ["react-hmre"],
							"plugins": [
								["react-transform", {
									"transforms": [{
										"transform": "react-transform-hmr",
										"imports": ["react"],
										"locals": ["module"]
									}]
								}]
							]
						}
					}
				}
			}
		]
	}
}