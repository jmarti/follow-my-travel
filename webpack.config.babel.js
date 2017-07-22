var path = require('path');

module.exports = {
	output: {
		publicPath: '/',
		libraryTarget: 'commonjs2'
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
		modules: [
			'client',
			'node_modules',
		]
	},
	module: {
	    loaders: [{
	    	test: /\.js$/,
	    	loaders: ['react-hot', 'babel'],
	    	include: path.join(__dirname, 'src')
	    }]
	}
}