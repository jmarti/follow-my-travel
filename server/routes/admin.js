import { Router } from 'express';
import config from '../config';

const router = new Router();


/* GET admin page */
router.get('/', function(req, res) {
	res.render('admin', {assets: config.adminAssets});
});

export default router;