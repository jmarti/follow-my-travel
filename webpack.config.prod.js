var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');

module.exports = {
	devtool: 'hidden-source-map',

	entry: {
		app: [
			'./src/main.js',
		],
		vendor: [
			'react',
			'react-dom'
		]
	},

	output: {
		path: __dirname + '/dist/',
		filename: '[name].[chunkhash].js',
		publicPath: '/',
	},

	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [
			'client',
			'node_modules'
		]
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production'),
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity,
			filename: 'vendor.js',
		}),
		new ManifestPlugin({
      		basePath: '/',
    	}),
    	new ChunkManifestPlugin({
	    	filename: "chunk-manifest.json",
	    	manifestVariable: "webpackManifest",
	    }),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false,
			}
		})
	]
}