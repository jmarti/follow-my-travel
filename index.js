// Entry script

if (process.env.NODE_ENV === 'production') {

} else {
	// Babel polyfill to convert ES6 code in runetime
	require('babel-register')({
	    "plugins": [
	      [
	        "babel-plugin-webpack-loaders",
	        {
	          "config": "./webpack.config.babel.js",
	          "verbose": false
	        }
	      ]
	    ]
	  });
	require('babel-polyfill');
	require('./server/server');
}