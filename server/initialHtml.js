const initialHtml = () => {

	// Import Manifests
	// const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
	// const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

	return `
		<!doctype html>
		<html>
			<head>
				<title>Follow my travel</title>
			</head>
			<body>
				<h1>Follow my travel APP</h1>
			</body>
		</html>
	`;
};

export default initialHtml;