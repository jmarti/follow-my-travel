import chokidar from 'chokidar';
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

const compiler = webpack(config);

if (isDev) {
	app.use(webpackDevMiddleware(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath
	}));
	app.use(webpackHotMiddleware(compiler));
}

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/public/views'));


/* ROUTES
**********/

app.use('/graphql', GraphHTTP({
	schema: Schema,
	pretty: isDev,
	graphiql: isDev
}));

app.set('views', path.join(__dirname, '../public/views'));
app.use('/', (req, res, next) => {
	require('./routes/index')(req, res, next);
});
app.use('/post', (req, res, next) => {
	require('./routes/post')(req, res, next);
});
app.use('/about', (req, res, next) => {
	require('./routes/about')(req, res, next);
});
// app.use('/admin', (req, res, next) => {
// 	require('./routes/admin')(req, res, next);
// });

// Anything else gets passed to the client app's server rendering
app.get('*', function(req, res, next) {
  require('../src/main')(req.path, function(err, page) {
    if (err) return next(err);
    res.send(page);
  });
});

// Do "hot-reloading" of express stuff on the server
// Throw away cached modules and re-require next time
// Ensure there's no important state in there!
const watcher = chokidar.watch('./public');

watcher.on('ready', function() {
  watcher.on('all', function() {
    console.log("Clearing /public/ module cache from server");
    Object.keys(require.cache).forEach(function(id) {
      if (/[\/\\]public[\/\\]/.test(id)) delete require.cache[id];
    });
  });
});

// Do "hot-reloading" of react stuff on the server
// Throw away the cached src modules and let them be re-required next time
compiler.plugin('done', function() {
  console.log("Clearing /src/ module cache from server");
  Object.keys(require.cache).forEach(function(id) {
    if (/[\/\\]src[\/\\]/.test(id)) delete require.cache[id];
  });
});



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