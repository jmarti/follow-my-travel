import Express from 'express';
import compression from 'compression';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';

// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Initialize the Express App
const app = new Express();

// Log requests to the console.
app.use(logger('dev'));

app.use(compression());

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
	const compiler = webpack(config);
	app.use(webpackDevMiddleware(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath
	}));
	app.use(webpackHotMiddleware(compiler));
}

app.set('view engine', 'hbs');


/* BLOG
**********/
import pgPromise from 'pg-promise';
import index from './routes/index';
import about from './routes/about';

const pgp = pgPromise();
const db = pgp('postgres://jordimarti:@localhost:5432/followMyTravelBlog');

db.one('SELECT $1 AS value', 123)
	.then(data => {
		console.log('DATA:', data.value);
	})
	.catch(error => {
		console.log('ERROR:', error)
	});

app.set('views', path.join(__dirname, 'views'));
app.use('/', index);
app.use('/about', about);

/*
** APP
*******/

// Import required modules
import initialHtml from './initialHtml';
import serverConfig from './config';

app.use('/app', (req, res, next) => {
	return res.set('Content-type', 'text/html')
		.status(200)
		.end(initialHtml());
});

app.listen(serverConfig.port, error => {
	if(!error) {
		console.log(`Server is running on port: ${serverConfig.port}!`);
	}
});

// export default app;
module.export = app;