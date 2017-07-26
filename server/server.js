import Express from 'express';
import compression from 'compression';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import GraphHTTP from 'express-graphql';

// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import Schema from './schemas';

// Initialize the Express App
const app = new Express();

// Log requests to the console.
app.use(logger('dev'));

app.use(compression());

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

if (isDev) {
	const compiler = webpack(config);
	app.use(webpackDevMiddleware(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath
	}));
	app.use(webpackHotMiddleware(compiler));
}

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/public/views'));


/* BLOG
**********/
import index from './routes/index';
import post from './routes/post';
import about from './routes/about';
import admin from './routes/admin';
// import graphql from './routes/graphql';

app.use('/graphql', GraphHTTP({
	schema: Schema,
	pretty: isDev,
	graphiql: isDev
}));

app.set('views', path.join(__dirname, '../public/views'));
app.use('/', index);
app.use('/about', about);
app.use('/post', post);
app.use('/admin', admin);


import serverConfig from './config';


/*
** ERROR HANDLING
******************/

import boom from 'express-boom';
app.use(boom());

app.use((req, res) => {
	res.boom.notFound();
});

app.use(function(req, res) {
	res.boom.badRequest('Validation didn\'t suceed', reasons);
})

/*
** STARTIN SERVER
******************/

app.listen(serverConfig.port, error => {
	if(!error) {
		console.log(`Server is running on port: ${serverConfig.port}!`);
	}
});

// export default app;
module.export = app;