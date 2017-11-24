const isDev = process.env.NODE_ENV === 'development';
const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);

const config = {
	port: process.env.PORT || 3000,
	adminAssets: {
		styleSheets: [],
		scripts: [
			isDev ? '/admin/bundle.js' : assetsManifest['/admin/bundle.js']
		]
	}
};

export default config;