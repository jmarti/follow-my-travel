import { Router } from 'express';
import GraphHTTP from 'express-graphql';

import Schema from '../schemas';

const router = new Router();

router.use('/', GraphHTTP({
	schema: Schema,
	pretty: true,
	graphiql: true
}));