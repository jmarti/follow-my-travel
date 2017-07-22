var webpack = require('webpack');
var path = require('path');

module.exports = {
	devtool: 'cheap-module-eval-source-map',

	entry: {
		app: [
			'webpack-hot-middleware/client',
			'webpack/hot/only-dev-server',
			'./src/main'
		],
		vendor: [
		  'react',
		  'react-dom',
		],
	},

	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'app.js',
		publicPath: '/'
	},

	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [
			'client',
			'node_modules',
		],
	},

	plugins: [
	new webpack.HotModuleReplacementPlugin(),
	new webpack.optimize.CommonsChunkPlugin({
		name: 'vendor',
		minChunks: Infinity,
		filename: 'vendor.js',
	}),
	new webpack.DefinePlugin({
		'process.env': {
			CLIENT: JSON.stringify(true),
			'NODE_ENV': JSON.stringify('development'),
		}
	}),
  ],
}